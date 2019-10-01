import { NowRequest, NowResponse } from "@now/node";

import cors from "../../../src/cors";
import { createBranch, listBranches } from "../../../src/lib/github";

const getRequest = async (
  _req: NowRequest,
  res: NowResponse
): Promise<void> => {
  try {
    const branches = await listBranches();
    res.json({ branches: branches.filter(branch => branch.name !== "master") });
  } catch (error) {
    res.status(error.status).send(error.name);
  }
};

const postRequest = async (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  try {
    const { name } = req.body;
    const branch = await createBranch(name);
    res.json({ branch });
  } catch (error) {
    res.status(error.status).send(error.name);
  }
};

const route = async (req: NowRequest, res: NowResponse): Promise<void> => {
  switch (req.method) {
    case "GET":
      getRequest(req, res);
      break;
    case "POST":
      postRequest(req, res);
      break;
    default:
      res.status(400).send("Method not supported");
  }
};

export default cors(route);
