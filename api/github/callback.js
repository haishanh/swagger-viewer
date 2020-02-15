'use strict';

const fetch = require('node-fetch');

const { GH_APP_CLIENT_ID, GH_APP_CLIENT_SECRET } = process.env;

async function request(url, { method, headers = {}, body } = {}) {
  const init = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers
    },
    method
  };
  if (body) {
    init.body = JSON.stringify(body);
  }
  const res = await fetch(url, init);
  const resHeaders = res.headers;
  if (res.ok) {
    const contentType = resHeaders.get('content-type');
    if (contentType.indexOf('json') > -1) {
      return await res.json();
    }
  }
  throw res;
}

module.exports = async (req, res) => {
  const { code } = req.query;
  const qs = `client_id=${GH_APP_CLIENT_ID}&client_secret=${GH_APP_CLIENT_SECRET}&code=${code}`;
  const url = `https://github.com/login/oauth/access_token?${qs}`;
  const ret = await request(url, { method: 'POST' });
  const toSave = { t: ret.access_token, c: new Date() };
  // assert ret.scope === 'repo'
  res.setHeader('Content-Type', 'text/html');
  const script = `
  <script>
    localStorage.setItem('sv:gh', '${JSON.stringify(toSave)}');
    window.location = '/';
  </script>
  `;
  res.write(script);
  res.end();
};
