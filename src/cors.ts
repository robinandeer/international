import { NowRequest, NowResponse } from "@now/node";

type NowFunction = (req: NowRequest, res: NowResponse) => void;

const cors = (route: NowFunction) => (
  req: NowRequest,
  res: NowResponse
): void => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  route(req, res);
};

export default cors;
