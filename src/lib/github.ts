import Octokit from "@octokit/rest"

import { LanguageCode, Screenshot } from "../../src/types"

const OWNER = "robinandeer"
const REPO_NAME = "international"
const BASE_BRANCH_NAME = "master"

const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN })

const getBaseBranch = async (): Promise<Octokit.ReposGetBranchResponse> => {
  const { data } = await octokit.repos.getBranch({
    owner: OWNER,
    repo: REPO_NAME,
    branch: BASE_BRANCH_NAME,
  })

  return data
}

export const listBranches = async (): Promise<
  Octokit.ReposListBranchesResponseItem[]
> => {
  const { data } = await octokit.repos.listBranches({
    owner: OWNER,
    repo: REPO_NAME,
  })

  return data
}

export const createBranch = async (
  name?: string
): Promise<Octokit.GitCreateRefResponse> => {
  console.log(name)
  const baseBranch = await getBaseBranch()

  let branchName
  if (!name) {
    const uniqueId = new Date().getTime().toString(36)
    branchName = `branch-${uniqueId}`
  } else {
    branchName = name
  }

  const { data } = await octokit.git.createRef({
    owner: OWNER,
    repo: REPO_NAME,
    ref: `refs/heads/${branchName}`,
    sha: baseBranch.commit.sha,
  })

  return data
}

export const getLanguages = async (): Promise<string[]> => {
  const filePath = "languages/"
  const { data: languagesDir } = await octokit.repos.getContents({
    owner: OWNER,
    repo: REPO_NAME,
    path: filePath,
  })

  const languages = languagesDir.map(item => item.name.replace(".json", ""))
  return languages
}

export const getLanguage = async (
  languageCode: LanguageCode,
  branchName: string
): Promise<object> => {
  const filePath = `languages/${languageCode}.json`
  const { data: languageFile } = await octokit.repos.getContents({
    owner: OWNER,
    repo: REPO_NAME,
    ref: branchName,
    path: filePath,
  })

  const buffer = Buffer.from(languageFile.content, languageFile.encoding)
  const languageString = buffer.toString()
  const languageData = JSON.parse(languageString)

  return languageData
}

export const updateLanguage = async (
  languageCode: LanguageCode,
  branchName: string,
  updatedData: object
): Promise<Octokit.ReposCreateOrUpdateFileResponse> => {
  const filePath = `languages/${languageCode}.json`
  const { data: languageFile } = await octokit.repos.getContents({
    owner: OWNER,
    repo: REPO_NAME,
    ref: branchName,
    path: filePath,
  })

  const stringContent = JSON.stringify(updatedData, null, 2)
  const { data } = await octokit.repos.createOrUpdateFile({
    owner: OWNER,
    repo: REPO_NAME,
    path: filePath,
    branch: branchName,
    sha: languageFile.sha,
    message: `Update ${languageCode} translations`,
    content: Buffer.from(stringContent).toString("base64"),
  })

  return data
}

export const createPullRequest = async (
  branchName: string
): Promise<Octokit.PullsCreateResponse> => {
  const { data } = await octokit.pulls.create({
    owner: OWNER,
    repo: REPO_NAME,
    title: "Update translations",
    head: branchName,
    base: BASE_BRANCH_NAME,
  })

  return data
}

export const listScreenshots = async (
  screen: string
): Promise<Screenshot[]> => {
  try {
    const filePath = `screenshots/${screen}`
    const { data: screenshotDir } = await octokit.repos.getContents({
      owner: OWNER,
      repo: REPO_NAME,
      path: filePath,
    })

    const screenshots = screenshotDir.map(item => ({
      name: item.name,
      url: item.download_url,
    }))
    return screenshots
  } catch {
    return []
  }
}
