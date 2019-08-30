import { NowRequest, NowResponse } from "@now/node"

import cors from "../../../src/cors"

const route = async (req: NowRequest, res: NowResponse): Promise<void> => {
  try {
    const language = await import(`../../../languages/${req.query.language}.json`)
    res.json({ language })
  } catch (error) {
    console.error(error)
    res.status(404).send("Unknown language")
  }
}

export default cors(route)
