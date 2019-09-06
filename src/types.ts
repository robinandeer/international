export interface TranslationApiResponse {
  language: object;
}

export interface LanguagesApiResponse {
  languages: string[];
}

export interface BranchItem {
  name: string;
}

export interface BranchesApiResponse {
  branches: BranchItem[];
}

export enum LanguageCode {
  sv = "sv",
  en = "en",
}
