import { NowRequest, NowResponse } from '@vercel/node';
import axios, { Method } from 'axios';

const { GH_APP_CLIENT_ID, GH_APP_CLIENT_SECRET } = process.env;

async function request(url: string, { method }: { method?: Method } = {}) {
  const init = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method,
  };
  const res = await axios(url, init);
  return res.data;
}

export default async function handler(req: NowRequest, res: NowResponse) {
  const { code, state } = req.query;
  const qs = `client_id=${GH_APP_CLIENT_ID}&client_secret=${GH_APP_CLIENT_SECRET}&code=${code}&state=${encodeURIComponent(
    state as string
  )}`;

  const url = `https://github.com/login/oauth/access_token?${qs}`;
  const ret = await request(url, { method: 'POST' });
  const toSave = { t: ret.access_token, c: new Date() };
  res.setHeader('Content-Type', 'text/html');

  // it's encodeURIComponent'ed before we send to GitHub
  // but
  // we dont need to decodeURIComponent here
  // it should be decoded already by this serverless app
  const to = state;

  const script = `
  <script>
    localStorage.setItem('sv:gh', '${JSON.stringify(toSave)}');
    window.location = '/${to}';
  </script>
  `;
  res.write(script);
  res.end();
}
