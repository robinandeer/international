import { useEffect, useState } from "react"
import { NextPage } from "next"

interface WelcomeData {
  welcomeLabel: string;
}

interface LanguageData {
  welcome: WelcomeData;
}

interface LanguageResponse {
  language: LanguageData;
}

const IndexPage: NextPage = () => {
  const [locale, setLocale] = useState<LanguageData | null>(null)

  const fetchLanguage = async (): Promise<void> => {
    const data: LanguageResponse = await (await fetch('/api/languages/en')).json()
    setLocale(data.language)
  }

  useEffect(() => {
    fetchLanguage()
  }, [])

  return (
    <div>{locale ? locale.welcome.welcomeLabel : 'loading...'}</div>
  )
}

export default IndexPage
