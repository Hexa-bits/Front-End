import CryptoJS from 'crypto-js';

export const hashPassword = (password) => {
    if (!password) return '';
    const hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Base64);
}