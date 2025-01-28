export function generateNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return array.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}
