import React, { useContext, useCallback, useState, useEffect } from "react"
import { Box, Tabs, Tab } from "grommet"

import MainContext from "../../../contexts/main"
import TranslationList from "./translation-list"

const ScreenTranslations: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { languages, language, setLanguage } = useContext(MainContext)

  const handleActive = useCallback(
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
      <Box margin={{ bottom: "small" }}>
        <Tabs onActive={handleActive} activeIndex={activeIndex}>
          {languages.map(languageCode => (
            <Tab key={languageCode} title={languageCode} />
          ))}
        </Tabs>
      </Box>
      <TranslationList />
    </Box>
  )
}

export default ScreenTranslations
