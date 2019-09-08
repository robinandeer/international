import React, { useEffect, useCallback, useContext } from "react"
import { NextPage } from "next"
import { Box, Grid } from "grommet"

import {
  TranslationApiResponse,
  LanguagesApiResponse,
  BranchesApiResponse,
} from "../../types"
import MainContext from "../../contexts/main"
import ScreenList from "./components/screen-list"
import Header from "./components/header"
import ScreenTranslations from "./components/screen-translations"
import Screenshots from "./components/screenshots"

const fetchTranslation = async (
  languageCode: string,
  branchName: string
): Promise<TranslationApiResponse> => {
  const url = `/api/translations/${languageCode}?branch=${branchName}`
  const response = await fetch(url)
  const data = await response.json()
  return data as TranslationApiResponse
}

const IndexScreen: NextPage = () => {
  const {
    language,
    branch,
    screen,
    refLanguage,
    setTranslation,
    setData,
    setLanguages,
    setLanguage,
    setBranches,
    setBranch,
    setScreen,
    setRefTranslation,
  } = useContext(MainContext)

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

  const fetchRefTranslation = useCallback(async (): Promise<void> => {
    const translation = await fetchTranslation(refLanguage, branch)
    setRefTranslation(translation)
  }, [branch, refLanguage])

  React.useEffect(() => {
    if (branch) {
      fetchRefTranslation()
    }
  }, [branch, fetchRefTranslation])

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
    if (data.branches.length > 0) {
      setBranch(data.branches[0].name)
    }
  }, [])

  React.useEffect(() => {
    fetchBranches()
  }, [])

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
      <Box gridArea="header">
        <Header />
      </Box>
      <Box gridArea="nav">
        <ScreenList />
      </Box>
      <Box gridArea="main">
        <Grid fill rows={["1/2", "1/2"]}>
          <Box pad="small">
            <Screenshots />
          </Box>
          <Box pad="small">
            <ScreenTranslations />
          </Box>
        </Grid>
      </Box>
    </Grid>
  )
}

export default IndexScreen
