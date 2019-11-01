import { createSlice, PayloadAction } from "redux-starter-kit";

import { TranslationApiResponse } from "../../types";
import { AppThunk } from "../store";
import { updateScreen } from "./config";

interface DataState {
  saving: boolean;
  loadingTranslation: boolean;
  translationMap: { [key: string]: TranslationApiResponse };
  translationDataMap: { [key: string]: object };
  screenshots: { [key: string]: string[] };
}

const initialState: DataState = {
  saving: false,
  loadingTranslation: false,
  translationMap: {},
  translationDataMap: {},
  screenshots: {},
};

const data = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateTranslationStart(state) {
      state.loadingTranslation = true;
    },
    updateTranslationSuccess(
      state,
      action: PayloadAction<{
        languageCode: string;
        translation: TranslationApiResponse;
      }>
    ) {
      state.loadingTranslation = false;
      state.translationMap[action.payload.languageCode] =
        action.payload.translation;
      state.translationDataMap[action.payload.languageCode] =
        action.payload.translation.language;
    },
    updateTranslationFail(state) {
      state.loadingTranslation = false;
    },
    updateTranslationData(
      state,
      action: PayloadAction<{ languageCode: string; data: object }>
    ) {
      state.translationDataMap[action.payload.languageCode] =
        action.payload.data;
    },
    updateSaving(state, action: PayloadAction<boolean>) {
      state.saving = action.payload;
    },
  },
});

export const {
  updateTranslationStart,
  updateTranslationSuccess,
  updateTranslationFail,
  updateTranslationData,
  updateSaving,
} = data.actions;

export default data.reducer;

const getTranslation = async (
  languageCode: string,
  branchName: string
): Promise<TranslationApiResponse> => {
  const url = `/api/translations/${languageCode}?branch=${branchName}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data as TranslationApiResponse;
  } else {
    throw new Error("Unexpected error");
  }
};

export const fetchTranslation = (languageCode: string): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(updateTranslationStart());

  const {
    config: { branch, screen },
  } = getState();

  try {
    const translation = await getTranslation(languageCode, branch);

    dispatch(updateTranslationSuccess({ languageCode, translation }));

    if (!screen) {
      dispatch(updateScreen(Object.keys(translation.language)[0]));
    }
  } catch (error) {
    console.error(error);
    dispatch(updateTranslationFail());
  }
};

export const saveTranslation = (): AppThunk => async (dispatch, getState) => {
  dispatch(updateSaving(true));

  const {
    auth: { email },
    config: { language, branch },
    data: { translationDataMap },
  } = getState();

  const translationData = translationDataMap[language];
  const url = `/api/translations/${language}?branch=${branch}&email=${email}`;
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(translationData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const newTranslation = (await response.json()) as TranslationApiResponse;

  dispatch(
    updateTranslationSuccess({
      languageCode: language,
      translation: newTranslation,
    })
  );

  dispatch(updateSaving(false));
};

interface TranslationDataRequest {
  languageCode: string;
  promise: Promise<Response>;
}

interface TranslationDataResponse {
  languageCode: string;
  translation: TranslationApiResponse;
}

const processTranslationDataRequest = async (
  request: TranslationDataRequest
): Promise<TranslationDataResponse> => {
  const response = await request.promise;
  const newTranslation = (await response.json()) as TranslationApiResponse;
  return {
    languageCode: request.languageCode,
    translation: newTranslation,
  };
};

export const saveTranslations = (): AppThunk => async (dispatch, getState) => {
  const {
    auth: { email },
    config: { branch },
    data: { translationDataMap, translationMap },
  } = getState();

  const savePromises = Object.entries(translationDataMap)
    .filter(
      ([languageCode, translationData]) =>
        JSON.stringify(translationData) !==
        JSON.stringify(translationMap[languageCode])
    )
    .map(
      ([languageCode, translationData]): TranslationDataRequest => {
        const url = `/api/translations/${languageCode}?branch=${branch}&email=${email}`;
        return {
          languageCode,
          promise: fetch(url, {
            method: "PUT",
            body: JSON.stringify(translationData),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }),
        };
      }
    )
    .map(processTranslationDataRequest);

  try {
    const translationDataResponses = await Promise.all(savePromises);
    translationDataResponses.forEach(payload => {
      dispatch(updateTranslationSuccess(payload));
    });
  } catch (error) {
    console.error(error);
  }

  dispatch(updateSaving(true));
};
