import { createSlice, PayloadAction } from "redux-starter-kit";

import { TranslationApiResponse } from "../../types";
import { AppThunk } from "../store";
import { updateScreen } from "./config";

interface DataState {
  translation: TranslationApiResponse | null;
  translationData: object | null;
  refTranslation: TranslationApiResponse | null;
  saving: boolean;
}

const initialState: DataState = {
  translation: null,
  translationData: null,
  refTranslation: null,
  saving: false,
};

const data = createSlice({
  slice: "data",
  initialState,
  reducers: {
    updateTranslation(state, action: PayloadAction<TranslationApiResponse>) {
      state.translation = action.payload;
    },
    updateTranslationData(state, action: PayloadAction<object>) {
      state.translationData = action.payload;
    },
    updateRefTranslation(state, action: PayloadAction<TranslationApiResponse>) {
      state.refTranslation = action.payload;
    },
    updateSaving(state, action: PayloadAction<boolean>) {
      state.saving = action.payload;
    },
  },
});

export const {
  updateTranslation,
  updateTranslationData,
  updateRefTranslation,
  updateSaving,
} = data.actions;

export default data.reducer;

const getTranslation = async (
  languageCode: string,
  branchName: string
): Promise<TranslationApiResponse> => {
  const url = `/api/translations/${languageCode}?branch=${branchName}`;
  const response = await fetch(url);
  const data = await response.json();
  return data as TranslationApiResponse;
};

export const fetchRefTranslation = (): AppThunk => async (
  dispatch,
  getState
) => {
  const {
    config: { refLanguage, branch },
  } = getState();
  const translation = await getTranslation(refLanguage, branch);
  dispatch(updateRefTranslation(translation));
};

export const fetchTranslation = (): AppThunk => async (dispatch, getState) => {
  const {
    config: { language, branch, screen },
  } = getState();

  const translation = await getTranslation(language, branch);

  dispatch(updateTranslation(translation));
  dispatch(updateTranslationData(translation.language));

  if (!screen) {
    dispatch(updateScreen(Object.keys(translation.language)[0]));
  }
};

export const saveTranslation = (): AppThunk => async (dispatch, getState) => {
  dispatch(updateSaving(true));

  const {
    auth: { email },
    config: { language, branch, refLanguage },
    data: { translationData },
  } = getState();

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

  dispatch(updateTranslation(newTranslation));

  if (language === refLanguage) {
    dispatch(updateRefTranslation(newTranslation));
  }

  dispatch(updateSaving(false));
};
