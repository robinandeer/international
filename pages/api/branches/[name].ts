import { NowRequest, NowResponse } from "@now/node";

import cors from "../../../src/cors";
import { fetchBranch } from "../../../src/lib/github";

const getRequest = async (req: NowRequest, res: NowResponse): Promise<void> => {
  try {
    const branchName = req.query.name as string;
    const branch = await fetchBranch(branchName);
    res.json({ branch: branch });
  } catch (error) {
    res.status(404).send("Branch not found");
  }
};

const route = async (req: NowRequest, res: NowResponse): Promise<void> => {
  switch (req.method) {
    case "GET":
      getRequest(req, res);
      break;
    default:
      res.status(400).send("Method not supported");
  }
};

export default cors(route);
