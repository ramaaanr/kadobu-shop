import CryptoJS from 'crypto-js';

const secretKey = 'And92N[as-21/[SDK2M-1N104Jpsd[a-2m1-fm@@-2e123';

export const encryptId = (id: number): string => {
  const ciphertext = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  return encodeURIComponent(ciphertext);
};

export const decryptId = (encryptedId: string): number => {
  const bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(encryptedId),
    secretKey,
  );
  const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
  return parseInt(decryptedId, 10);
};
