import axios, { Method } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query as Record<string, string>;
  const qs = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GH_APP_CLIENT_ID,
    client_secret: process.env.GH_APP_CLIENT_SECRET,
    code,
    state,
  });
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
    window.location = '${to}';
  </script>
  `;
  res.write(script);
  res.end();
}

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
