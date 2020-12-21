// from https://deno.land/std@0.81.0/encoding/base64.ts
/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation
 * @param data
 */
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
  return decoder.decode(b64ToBytes(str));
}
