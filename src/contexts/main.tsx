import React, { useState } from "react"
import { TranslationApiResponse } from "../types"

const initialState = {
  language: "en",
  branch: null,
  translation: null,
  data: null,
  languages: [],
  branches: [],
  screen: null,
  refLanguage: "en",
  refTranslation: null,
  setLanguage: (value: string): void => {},
  setBranch: (value: string): void => {},
  setTranslation: (value: TranslationApiResponse): void => {},
  setData: (value: object): void => {},
  setLanguages: (value: string[]): void => {},
  setBranches: (value: string[]): void => {},
  setScreen: (value: string): void => {},
  setRefTranslation: (value: TranslationApiResponse): void => {},
}

const MainContext = React.createContext(initialState)

export const MainProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<string | null>(initialState.language)
  const [branch, setBranch] = useState<string | null>(initialState.branch)

  const [translation, setTranslation] = useState<TranslationApiResponse | null>(
    initialState.translation
  )
  const [data, setData] = useState<object | null>(initialState.data)
  const [
    refTranslation,
    setRefTranslation,
  ] = useState<TranslationApiResponse | null>(initialState.refTranslation)

  const [languages, setLanguages] = useState<string[]>(initialState.languages)
  const [branches, setBranches] = useState<string[]>(initialState.branches)

  const [screen, setScreen] = useState<string | null>(initialState.branch)

  const [refLanguage] = useState<string>(initialState.refLanguage)

  return (
    <MainContext.Provider
      value={{
        language,
        branch,
        translation,
        data,
        languages,
        branches,
        screen,
        refTranslation,
        refLanguage,
        setTranslation,
        setData,
        setLanguage,
        setBranch,
        setLanguages,
        setBranches,
        setScreen,
        setRefTranslation,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainContext
