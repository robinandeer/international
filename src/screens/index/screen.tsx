import React, { useEffect, useState, useCallback, useContext } from "react"
import { NextPage } from "next"
import { Box, Grid } from "grommet"

import MainContext from "../../contexts/main"
import ScreenList from "./components/screen-list"
import Header from "./components/header"
import ScreenTranslations from "./components/screen-translations"
import {
  TranslationApiResponse,
  LanguagesApiResponse,
  BranchesApiResponse,
} from "../../types"

const fetchTranslation = async (
  languageCode: string,
  branchName: string
): Promise<TranslationApiResponse> => {
  const url = `/api/languages/${languageCode}?branch=${branchName}`
  const response = await fetch(url)
  const data = await response.json()
  return data as TranslationApiResponse
}

const updateTranslation = async (
  languageCode: string,
  branchName: string,
  languageData: object
): Promise<TranslationApiResponse> => {
  const url = `/api/languages/${languageCode}?branch=${branchName}`
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(languageData),
  })
  const data = (await response.json()) as TranslationApiResponse
  return data
}

const IndexScreen: NextPage = () => {
  const {
    language,
    branch,
    data,
    screen,
    setTranslation,
    setData,
    setLanguages,
    setLanguage,
    setBranches,
    setBranch,
    setScreen,
  } = useContext(MainContext)
  const [saving, setSaving] = useState<boolean>(false)

  const fetchLanguage = useCallback(async (): Promise<void> => {
    const translation = await fetchTranslation(language, branch)
    setTranslation(translation)
    setData(translation.language)
    if (!screen) {
      setScreen(Object.keys(translation.language)[0])
    }
  }, [language, branch, screen])

  useEffect(() => {
    if (branch && language) {
      fetchLanguage()
    }
  }, [language, branch])

  const fetchLanguages = React.useCallback(async () => {
    const response = await fetch("/api/languages")
    const data = (await response.json()) as LanguagesApiResponse
    setLanguages(data.languages)
    setLanguage(data.languages[0])
  }, [])

  React.useEffect(() => {
    fetchLanguages()
  }, [])

  const fetchBranches = React.useCallback(async () => {
    const response = await fetch("/api/branches")
    const data = (await response.json()) as BranchesApiResponse
    setBranches(data.branches.map(branch => branch.name))
    setBranch(data.branches[0].name)
  }, [])

  React.useEffect(() => {
    fetchBranches()
  }, [])

  const updateLanguage = useCallback(async (): Promise<void> => {
    setSaving(true)
    const newData = await updateTranslation(language, branch, data)
    setTranslation(newData)
    setSaving(false)
  }, [language, branch, data])

  const handleSubmitLanguage = useCallback(() => {
    updateLanguage()
  }, [language, branch, data])

  return (
    <Grid
      fill
      rows={["xxsmall", "flex"]}
      columns={["small", "flex"]}
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "nav", start: [0, 1], end: [0, 1] },
        { name: "main", start: [1, 1], end: [1, 1] },
      ]}
    >
      <Box gridArea="header" background="brand">
        <Header />
      </Box>
      <Box
        gridArea="nav"
        border={{ color: "light-2", size: "small", side: "right" }}
      >
        <ScreenList />
      </Box>
      <Box gridArea="main">
        <Grid fill rows={["1/2", "1/2"]}>
          <Box border={{ color: "light-2", size: "small", side: "bottom" }} />
          <Box>
            <ScreenTranslations />
          </Box>
        </Grid>
      </Box>
    </Grid>
  )
}

export default IndexScreen
