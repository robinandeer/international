import { NowRequest, NowResponse } from "@now/node"

import { LanguageCode } from "../../../src/types"
import cors from "../../../src/cors"

const getRequest = async (
  _req: NowRequest,
  res: NowResponse
): Promise<void> => {
  res.json({ languages: [LanguageCode.en, LanguageCode.sv] })
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
