export async function getLocalTranslation(
  code: string
): Promise<object | null> {
  try {
    const data: { default: object } = await import(
      `../translations/${code}.json`
    );
    return data.default;
  } catch (error) {
    return null;
  }
}
