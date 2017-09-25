var crypto = require('crypto');
const salt = () => {
    var time = Date.now() % 100,
        str = '';
    time = time === 0 ? '00' : String(time);
    for (let i = 0; i < 8; i++) {
        const base = Math.random() < 0.5 ? 65 : 97;
        str += String.fromCharCode(
            base +
            Math.floor(
                Math.random() * 26
            )
        );
    }
    return time + str;
};
const md5 = (text) => {
    return crypto.createHash("md5").update(String(text)).digest("hex");
};
const encrypt = (password, saltString) => {
    return md5(md5(password) + saltString);
};
exports.salt = salt;
exports.encrypt = encrypt;