const cryptoJS = require('crypto-js');
const secretKey = "2435353534646546"


const encrypt = (text) => {
    const encrypted = cryptoJS.AES.encrypt(text, secretKey).toString();
    return encrypted;
};

const decrypt = (text) => {
    const decrypted = cryptoJS.AES.decrypt(text, secretKey);
    return decrypted.toString(cryptoJS.enc.Utf8);
};

module.exports = {
    encrypt,
    decrypt
}