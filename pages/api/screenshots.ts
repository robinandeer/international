import { NowRequest, NowResponse } from "@now/node"

import cors from "../../src/cors"
import { listScreenshots } from "../../src/lib/github"

const route = async (req: NowRequest, res: NowResponse): Promise<void> => {
  const screen = req.query.screen as string

  if (!screen) {
    res.status(400).send("Screen parameter is required")
  } else {
    const screenshots = await listScreenshots(screen)
    res.json({ screenshots })
  }
}

export default cors(route)
