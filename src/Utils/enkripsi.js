import CryptoJS, { enc } from "crypto-js";
import { key } from "./Config";

const CryptoJSAesJson = {
    stringify: function (cipherParams) {
        var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
        if (cipherParams.iv) j.iv = cipherParams.iv.toString();
        if (cipherParams.salt) j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    parse: function (jsonStr) {
        var j = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) });
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        return cipherParams;
    }
}

const dencryptAES = (data_encrypt) => {
    const encrypted = (CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(data_encrypt)));
    var decrypted = JSON.parse(CryptoJS.AES.decrypt(encrypted, key, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8));
    return decrypted;
}

const encryptAES = (text) => {
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(text), key, { format: CryptoJSAesJson }).toString();
    encrypted = CryptoJS.enc.Utf8.parse(JSON.stringify(encrypted));
    return CryptoJS.enc.Base64.stringify(encrypted);

}
export { dencryptAES, encryptAES };