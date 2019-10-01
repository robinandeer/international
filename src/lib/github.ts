import Octokit from "@octokit/rest";

import { LanguageCode, Screenshot } from "../../src/types";

const OWNER = "robinandeer";
const REPO_NAME = "international";
const BASE_BRANCH_NAME = "master";

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
  log: process.env.NODE_ENV !== "production" ? console : undefined,
});

const getBaseBranch = async (): Promise<Octokit.ReposGetBranchResponse> => {
  const { data } = await octokit.repos.getBranch({
    owner: OWNER,
    repo: REPO_NAME,
    branch: BASE_BRANCH_NAME,
  });

  return data;
};

export const listBranches = async (): Promise<
  Octokit.ReposListBranchesResponseItem[]
> => {
  const { data } = await octokit.repos.listBranches({
    owner: OWNER,
    repo: REPO_NAME,
  });

  return data;
};

export const fetchBranch = async (
  branch: string
): Promise<Octokit.ReposGetBranchResponse> => {
  const { data } = await octokit.repos.getBranch({
    owner: OWNER,
    repo: REPO_NAME,
    branch,
  });
  return data;
};

export const createBranch = async (
  name?: string
): Promise<Octokit.GitCreateRefResponse> => {
  console.log(name);
  const baseBranch = await getBaseBranch();

  let branchName;
  if (!name) {
    const uniqueId = new Date().getTime().toString(36);
    branchName = `branch-${uniqueId}`;
  } else {
    branchName = name;
  }

  const { data } = await octokit.git.createRef({
    owner: OWNER,
    repo: REPO_NAME,
    ref: `refs/heads/${branchName}`,
    sha: baseBranch.commit.sha,
  });

  return data;
};

const determineIfIsItemList = (
  toBeDetermined: Octokit.ReposGetContentsResponse
): toBeDetermined is Octokit.ReposGetContentsResponseItem[] => {
  if ((toBeDetermined as Octokit.ReposGetContentsResponseItem[]).map) {
    return true;
  }

  return false;
};

export const getLanguageCodes = async (): Promise<string[]> => {
  const filePath = "translations/";
  const { data: translationsDir } = await octokit.repos.getContents({
    owner: OWNER,
    repo: REPO_NAME,
    path: filePath,
  });

  if (determineIfIsItemList(translationsDir)) {
    const languages = translationsDir.map(item =>
      item.name.replace(".json", "")
    );
    return languages;
  }

  return [];
};

export const getTranslation = async (
  languageCode: LanguageCode,
  branchName: string
): Promise<object> => {
  const filePath = `translations/${languageCode}.json`;
  const { data: translationFile } = await octokit.repos.getContents({
    owner: OWNER,
    repo: REPO_NAME,
    ref: branchName,
    path: filePath,
  });

  if (!determineIfIsItemList(translationFile)) {
    const buffer = Buffer.from(translationFile.content, "base64");
    const translationString = buffer.toString();
    const translationData = JSON.parse(translationString);
    return translationData;
  }
};

export const updateTranslation = async (
  languageCode: LanguageCode,
  branchName: string,
  updatedData: object,
  email: string
): Promise<Octokit.ReposCreateOrUpdateFileResponse> => {
  const filePath = `translations/${languageCode}.json`;
  const { data: translationFile } = await octokit.repos.getContents({
    owner: OWNER,
    repo: REPO_NAME,
    ref: branchName,
    path: filePath,
  });

  if (!determineIfIsItemList(translationFile)) {
    const stringContent = JSON.stringify(updatedData, null, 2);
    try {
      const { data } = await octokit.repos.createOrUpdateFile({
        owner: OWNER,
        repo: REPO_NAME,
        path: filePath,
        branch: branchName,
        sha: translationFile.sha,
        message: `Update ${languageCode} translations`,
        content: Buffer.from(stringContent).toString("base64"),
        committer: {
          name: "Language Editor",
          email,
        },
      });

      return data;
    } catch (error) {
      console.error(error);
      console.error(error.message);
      throw error;
    }
  }
};

export const createPullRequest = async (
  branchName: string
): Promise<Octokit.PullsCreateResponse> => {
  const { data } = await octokit.pulls.create({
    owner: OWNER,
    repo: REPO_NAME,
    title: "Update translations",
    head: branchName,
    base: BASE_BRANCH_NAME,
  });

  return data;
};

export const listScreenshots = async (
  screen: string
): Promise<Screenshot[]> => {
  try {
    const filePath = `screenshots/${screen}`;
    const { data: screenshotDir } = await octokit.repos.getContents({
      owner: OWNER,
      repo: REPO_NAME,
      path: filePath,
    });

    if (determineIfIsItemList(screenshotDir)) {
      const screenshots = screenshotDir.map(item => ({
        name: item.name,
        url: item.download_url,
      }));
      return screenshots;
    }

    return [];
  } catch {
    return [];
  }
};
