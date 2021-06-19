const TokenKey = 'sv:gh';

async function request(
  url: string,
  opts: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
  } = {}
) {
  const method = opts.method || 'GET';
  const headers = opts.headers || {};
  const body = opts.body;

  const init: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    method,
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

export async function getContents({
  owner,
  repo,
  ref,
  path,
}: {
  owner?: string;
  repo?: string;
  ref?: string;
  path?: string;
}) {
  let url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  if (ref) url += '?ref=' + ref;

  const token = getGitHubTokenFromLocalStorageSafely();
  let headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const json = await request(url, { headers });
  return json;
}

export function loginWithGitHub() {
  const callbackUrl = window.location.origin + '/api/github/callback';
  const qs = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GH_APP_CLIENT_ID,
    redirect_uri: callbackUrl,
    scope: 'repo',
    state: window.location.href,
  });
  const to = `https://github.com/login/oauth/authorize?${qs}`;
  window.location.href = to;
}

export function logoutGitHub() {
  localStorage.removeItem(TokenKey);
}
