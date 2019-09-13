import { NowRequest, NowResponse } from "@now/node";

import cors from "../../src/cors";

const route = async (_req: NowRequest, res: NowResponse): Promise<void> => {
  const packageData = await import("../../package.json");
  res.json({ version: packageData.version });
};

export default cors(route);
