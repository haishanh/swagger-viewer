import { NowRequest, NowResponse } from '@vercel/node';

const { GH_APP_CLIENT_ID } = process.env;

export default function handler(req: NowRequest, res: NowResponse) {
  res.json({
    req: { headers: req.headers, body: req.body },
    ghClientId: GH_APP_CLIENT_ID,
  });
}
