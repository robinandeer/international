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
  const currentTranslation = state.data.translationMap[state.config.language];
  return currentTranslation
    ? Object.keys(currentTranslation.language).sort()
    : [];
};

export const selectScreen = (state: RootState): string => state.config.screen;

export const selectCurrentTranslation = (
  state: RootState
): TranslationApiResponse | undefined =>
  state.data.translationMap[state.config.language];

export const selectLoadingLanguage = (state: RootState): string | null =>
  state.data.loadingTranslation ? state.config.language : null;

export const selectScreenTranslationList = (state: RootState): string[] => {
  const currentTranslation = state.data.translationMap[state.config.language];
  if (currentTranslation && state.config.screen) {
    return Object.keys(currentTranslation.language[state.config.screen]).sort();
  } else {
    return [];
  }
};

export const selectCurrentTranslationData = (
  state: RootState
): object | undefined => state.data.translationDataMap[state.config.language];

export const selectRefTranslation = (
  state: RootState
): TranslationApiResponse | undefined =>
  state.data.translationMap[state.config.refLanguage];

export const selectSavingTranslation = (state: RootState): boolean =>
  state.data.saving;
