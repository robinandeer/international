import React, { useCallback, useContext, useState } from "react"
import { Button } from "grommet"

import { TranslationApiResponse } from "../../../types"
import MainContext from "../../../contexts/main"

const updateTranslation = async (
  languageCode: string,
  branchName: string,
  languageData: object
): Promise<TranslationApiResponse> => {
  const url = `/api/translations/${languageCode}?branch=${branchName}`
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(languageData),
  })
  const data = (await response.json()) as TranslationApiResponse
  return data
}

const SaveButton: React.FC = () => {
  const {
    language,
    branch,
    data,
    setTranslation,
    setRefTranslation,
    refLanguage,
  } = useContext(MainContext)
  const [saving, setSaving] = useState<boolean>(false)

  const updateLanguage = useCallback(async (): Promise<void> => {
    setSaving(true)
    const newData = await updateTranslation(language, branch, data)
    setTranslation(newData)
    if (language === refLanguage) {
      setRefTranslation(newData)
    }
    setSaving(false)
  }, [language, branch, data])

  const handleSaveTranslations = useCallback(() => {
    updateLanguage()
  }, [updateLanguage])

  return (
    <Button
      primary
      label={saving ? "Saving..." : "Save changes"}
      onClick={handleSaveTranslations}
      disabled={saving}
    />
  )
}

export default SaveButton
