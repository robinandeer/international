import { NowRequest, NowResponse } from "@now/node";

import cors from "../../src/cors";

const route = async (_req: NowRequest, res: NowResponse): Promise<void> => {
  const data = await import("../../settings/global.json");
  res.json(data.default);
};

export default cors(route);
