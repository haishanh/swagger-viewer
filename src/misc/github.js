const TokenKey = 'sv:gh';

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

export function getGitHubTokenFromLocalStorageSafely() {
  try {
    const data = localStorage.getItem(TokenKey);
    const { t } = JSON.parse(data);
    return t;
  } catch (err) {
    // ignore
  }
}

export async function getContents({ owner, repo, ref, path }) {
  let url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  if (ref) url += '?ref=' + ref;

  const token = getGitHubTokenFromLocalStorageSafely();
  let headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const json = await request(url, { headers });
  return json;
}

export function loginWithGitHub() {
  const callbackUrl = window.location.origin + '/api/github/callback';
  const redirect = encodeURIComponent(callbackUrl);
  const clientId = process.env.GH_APP_CLIENT_ID;
  window.location = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}&scope=repo`;
}

export function logoutGitHub() {
  localStorage.removeItem(TokenKey);
}
