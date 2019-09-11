import { TranslationApiResponse } from "../types";
import { RootState } from "./rootReducer";

export const selectBranch = (state: RootState): string => state.config.branch;

export const selectLanguage = (state: RootState): string =>
  state.config.language;

export const selectRefLanguage = (state: RootState): string =>
  state.config.refLanguage;

export const selectEmail = (state: RootState): string => state.auth.email;

export const selectLanguages = (state: RootState): string[] =>
  state.config.languages;

export const selectScreen = (state: RootState): string => state.config.screen;

export const selectTranslation = (state: RootState): TranslationApiResponse =>
  state.data.translation;

export const selectTranslationData = (state: RootState): object =>
  state.data.translationData;

export const selectRefTranslation = (
  state: RootState
): TranslationApiResponse => state.data.refTranslation;

export const selectSavingTranslation = (state: RootState): boolean =>
  state.data.saving;
