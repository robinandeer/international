import React, { useContext, useCallback, useState, useEffect } from "react"
import { Box, Button } from "grommet"

import MainContext from "../../../contexts/main"
import TranslationList from "./translation-list"
import SaveButton from "./save-button"

const ScreenTranslations: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { languages, language, setLanguage } = useContext(MainContext)

  const handleClickLanguage = useCallback(
    (index: number): void => {
      const selectedLanguage = languages[index]
      setLanguage(selectedLanguage)
    },
    [language]
  )

  useEffect(() => {
    const newActiveIndex = languages.findIndex(
      languageCode => languageCode === language
    )
    setActiveIndex(newActiveIndex === -1 ? 0 : newActiveIndex)
  }, [language])

  return (
    <Box align="start">
      <Box
        width="100%"
        direction="row"
        align="center"
        justify="between"
        margin={{ bottom: "small" }}
      >
        <Box direction="row" align="center">
          {languages.map((languageCode, index) => (
            <Button
              primary={index === activeIndex}
              key={languageCode}
              label={languageCode}
              onClick={(): void => handleClickLanguage(index)}
              margin={{ right: "small" }}
            />
          ))}
        </Box>
        <SaveButton />
      </Box>
      <TranslationList />
    </Box>
  )
}

export default ScreenTranslations
