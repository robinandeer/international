import { NowRequest, NowResponse } from "@now/node"
import Octokit from "@octokit/rest"

import cors from "../../src/cors"

const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN })

const route = async (req: NowRequest, res: NowResponse): Promise<void> => {
  const owner = "robinandeer"
  const repo = "international"
  const baseBranchName = "master"

  const { data: baseBranch } = await octokit.repos.getBranch({
    owner,
    repo,
    branch: baseBranchName
  })

  const uniqueId = (new Date().getTime()).toString(36)
  const branchName = `test-branch-${uniqueId}`
  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha: baseBranch.commit.sha
  })

  // commit something to the new branch
  const filePath = "languages/en.json"
  octokit.repos.getContents({
    owner,
    repo,
    ref: branchName,
    path: filePath,
  })

  octokit.repos.updateFile({
    owner,
    repo,
    path: filePath,
    branch: branchName,
    message: "Update English translations",
    content: JSON.stringify({ name: "robin" }),
  })

  octokit.git.createCommit({
    owner,
    repo,
    message: "Update translations",
    tree: "???",
    parents: "???"
  })

  const { data: pullRequest } = await octokit.pulls.create({
    owner,
    repo,
    title: "Update translations",
    head: branchName,
    base: baseBranchName
  })

  res.json({ pullRequest })
}

export default cors(route)

