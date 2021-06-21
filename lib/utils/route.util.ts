import { urlEncode } from '$lib/misc/b64';

export function buildSpecLink(url: string) {
  return '/spec/' + urlEncode(encodeURIComponent(url));
}

export function extractSpecLink(url: string) {
  return '/spec/' + urlEncode(encodeURIComponent(url));
}
