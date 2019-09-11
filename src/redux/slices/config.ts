import { createSlice, PayloadAction } from "redux-starter-kit";

import { LanguagesApiResponse } from "../../types";
import { AppThunk } from "../store";

interface ConfigState {
  language: string | null;
  branch: string | null;
  screen: string | null;
  refLanguage: string;
  languages: string[];
}

const initialState: ConfigState = {
  language: null,
  branch: null,
  screen: null,
  refLanguage: "en",
  languages: [],
};

const config = createSlice({
  slice: "config",
  initialState,
  reducers: {
    updateLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    updateBranch(state, action: PayloadAction<string>) {
      state.branch = action.payload;
    },
    updateLanguages(state, action: PayloadAction<string[]>) {
      state.languages = action.payload;
    },
    updateScreen(state, action: PayloadAction<string>) {
      state.screen = action.payload;
    },
  },
});

export const {
  updateBranch,
  updateLanguage,
  updateLanguages,
  updateScreen,
} = config.actions;

export default config.reducer;

export const fetchLanguages = (): AppThunk => async dispatch => {
  const response = await fetch("/api/languages");
  if (response.ok) {
    const data = (await response.json()) as LanguagesApiResponse;
    dispatch(updateLanguages(data.languages));
    if (data.languages.length > 0) {
      dispatch(updateLanguage(data.languages[0]));
    }
  }
};
