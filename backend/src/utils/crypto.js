const crypto = require('crypto');
const fs = require('fs');

// Utility function to generate a random string
function randomString(size = 32) {
    return crypto.randomBytes(size).toString('hex').slice(0, size);
  }
  
// Utility function to generate a code challenge
function generateCodeChallenge(codeVerifier) {
    const hash = crypto.createHash('sha256');
    hash.update(codeVerifier);
    return hash.digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function generateDigest(payload) {
    const payloadDigest = crypto.createHash('sha256').update(payload).digest('base64');
    return `SHA-256=${payloadDigest}`;
  }

function generateSignature(signingString, keyPath) {
    const sign = crypto.createSign('SHA256');
    sign.update(signingString);
    sign.end();
    return sign.sign({ key: fs.readFileSync(`${keyPath}example_client_signing.key`), passphrase: 'changeit' }, 'base64');
}


module.exports = {
    randomString,
    generateCodeChallenge,
    generateDigest,
    generateSignature
}