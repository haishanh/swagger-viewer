'use strict';

const got = require('got');

const { GH_APP_CLIENT_ID, GH_APP_CLIENT_SECRET } = process.env;

async function request(url, { method = 'GET', headers, body } = {}) {
  const init = {
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      ...headers
    },
    method,
    body,
    json: true
  };
  const x = await got(url, init);
  // console.log(x.statusCode);
  return x.body;
}

module.exports = async (req, res) => {
  const { code } = req.query;
  const qs = `client_id=${GH_APP_CLIENT_ID}&client_secret=${GH_APP_CLIENT_SECRET}&code=${code}`;
  const url = `https://github.com/login/oauth/access_token?${qs}`;
  const ret = await request(url, { method: 'POST' });

  res.setHeader('Content-Type', 'text/html');
  // TODO
  // storage key name
  // expire time?
  const script = `
<script>

localStorage.setItem('gh', '${ret.access_token}');

window.location = '/';
</script>
`;

  res.write(script);
  res.end();
};
