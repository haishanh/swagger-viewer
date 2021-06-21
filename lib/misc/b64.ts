// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.

// prettier-ignore
const base64abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
  "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", 
  "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", 
  "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", 
  "5", "6", "7", "8", "9", "+", "/"];

/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation
 * @param data
 */
export function encode(data: ArrayBuffer | string): string {
  const uint8 =
    typeof data === 'string'
      ? new TextEncoder().encode(data)
      : data instanceof Uint8Array
      ? data
      : new Uint8Array(data);
  let result = '',
    i;
  const l = uint8.length;
  for (i = 2; i < l; i += 3) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[((uint8[i - 1] & 0x0f) << 2) | (uint8[i] >> 6)];
    result += base64abc[uint8[i] & 0x3f];
  }
  if (i === l + 1) {
    // 1 octet yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4];
    result += '==';
  }
  if (i === l) {
    // 2 octets yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[(uint8[i - 1] & 0x0f) << 2];
    result += '=';
  }
  return result;
}

/**
 * Decodes a given RFC4648 base64 encoded string
 * @param b64
 */
function b64ToBytes(b64: string): Uint8Array {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

export function decode(
  str: string,
  decoder = new TextDecoder('utf-8')
): string {
  if (typeof window === 'undefined') {
    // in Node
    return Buffer.from(str, 'base64').toString();
  } else {
    // in browser
    return decoder.decode(b64ToBytes(str));
  }
}

function addPaddingToBase64url(base64url: string): string {
  if (base64url.length % 4 === 2) return base64url + '==';
  if (base64url.length % 4 === 3) return base64url + '=';
  if (base64url.length % 4 === 1) {
    throw new TypeError('Illegal base64url string!');
  }
  return base64url;
}

function convertBase64urlToBase64(b64url: string): string {
  return addPaddingToBase64url(b64url).replace(/\-/g, '+').replace(/_/g, '/');
}

function convertBase64ToBase64url(b64: string): string {
  return b64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function urlEncode(str: string): string {
  return convertBase64ToBase64url(encode(str));
}

/**
 * Converts given base64url encoded data back to original
 * @param b64url
 */
export function urlDecode(b64url: string): string {
  return decode(convertBase64urlToBase64(b64url));
}
