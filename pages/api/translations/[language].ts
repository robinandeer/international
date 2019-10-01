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

  try {
    let language;
    if (branchName) {
      console.log(
        `GET /api/translations/${languageCode} | remote ${branchName}`
      );
      language = await getRemoteTranslation(languageCode, branchName);
    } else {
      console.log(`GET /api/translations/${languageCode} | local`);
      language = await getLocalTranslation(languageCode);
    }

    if (language) {
      res.json({ language });
    } else {
      res.status(404).send("Unknown language");
    }
  } catch (error) {
    res.status(error.status).send(error.name);
  }
};

const putRequest = async (req: NowRequest, res: NowResponse): Promise<void> => {
  const branchName = req.query.branch as string;
  const languageCode = req.query.language as LanguageCode;
  const email = req.query.email as string;

  try {
    console.log(`PUT ${languageCode} | ${branchName} | ${email}`);
    await updateTranslation(languageCode, branchName, req.body, email);
    console.log(`PUT /api/translations/${languageCode} | get new translation`);
    getRequest(req, res);
  } catch (error) {
    res.status(error.status).send(error.name);
  }
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
