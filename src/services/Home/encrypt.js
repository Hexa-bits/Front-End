const crypto = require('crypto');

export const hashPassword = (password) => {
    const hash = crypto.createHash('sha256').update(password).digest();
    return hash.toString('base64');
}