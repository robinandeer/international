import { NowRequest, NowResponse } from "@now/node"

import { getLanguages } from "../../src/lib/github"
import cors from "../../src/cors"

const getRequest = async (
  _req: NowRequest,
  res: NowResponse
): Promise<void> => {
  const languages = await getLanguages()
  res.json({ languages })
}

const route = async (req: NowRequest, res: NowResponse): Promise<void> => {
  switch (req.method) {
    case "GET":
      getRequest(req, res)
      break
    default:
      res.status(400).send("Unknown method")
  }
}

export default cors(route)
