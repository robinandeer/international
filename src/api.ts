import { LanguageCode } from "./types"

export async function getLanguage(code: LanguageCode): Promise<object | null> {
  try {
    const data: { default: object } = await import(`../languages/${code}.json`)
    return data.default
  } catch (error) {
    return null
  }
}
