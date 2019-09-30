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

export const selectScreens = (state: RootState): string[] => {
  return state.data.translation
    ? Object.keys(state.data.translation.language).sort()
    : [];
};

export const selectScreen = (state: RootState): string => state.config.screen;

export const selectTranslation = (state: RootState): TranslationApiResponse =>
  state.data.translation;

export const selectLoadingLanguage = (state: RootState): string | null =>
  state.data.loadingTranslation ? state.config.language : null;

export const selectScreenTranslationList = (
  state: RootState
): Array<[string, unknown]> => {
  if (state.data.translation && state.config.screen) {
    return Object.entries(
      state.data.translation.language[state.config.screen]
    ).sort();
  } else {
    return [];
  }
};

export const selectTranslationData = (state: RootState): object =>
  state.data.translationData;

export const selectRefTranslation = (
  state: RootState
): TranslationApiResponse => state.data.refTranslation;

export const selectSavingTranslation = (state: RootState): boolean =>
  state.data.saving;
