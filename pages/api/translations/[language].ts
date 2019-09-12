import { NowRequest, NowResponse } from "@now/node";

import { LanguageCode } from "../../../src/types";
import {
  getTranslation as getRemoteTranslation,
  updateTranslation,
} from "../../../src/lib/github";
import { getLocalTranslation } from "../../../src/api";
import cors from "../../../src/cors";

const getRequest = async (req: NowRequest, res: NowResponse): Promise<void> => {
  const branchName = req.query.branch as string;
  const languageCode = req.query.language as LanguageCode;

  let language;
  if (branchName) {
    language = await getRemoteTranslation(languageCode, branchName);
  } else {
    language = await getLocalTranslation(languageCode);
  }

  if (language) {
    res.json({ language });
  } else {
    res.status(404).send("Unknown language");
  }
};

const putRequest = async (req: NowRequest, res: NowResponse): Promise<void> => {
  const branchName = req.query.branch as string;
  const languageCode = req.query.language as LanguageCode;
  await updateTranslation(languageCode, branchName, req.body);
  getRequest(req, res);
};

const route = async (req: NowRequest, res: NowResponse): Promise<void> => {
  switch (req.method) {
    case "GET":
      getRequest(req, res);
      break;
    case "PUT":
      putRequest(req, res);
      break;
    default:
      res.status(400).send("Unknown method");
  }
};

export default cors(route);
