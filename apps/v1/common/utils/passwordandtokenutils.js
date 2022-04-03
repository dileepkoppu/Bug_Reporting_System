const appRoot = require("app-root-path")
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken')
const fs = require("fs")

const pathToKey = appRoot+"/id_rsa_priv.pem";
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');


validPassword =(password, hash, salt) =>{
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

genPassword= (password)=> {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

const issueJWT=(user)=> {
  try {
    const _id = user._id;
    const role = user.role_ids
    const expiresIn = '1d';
    const payload = {
      sub: _id,
      role:role,
      username:user.username,
      iat: Date.now()
    };
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
    return {
    token: "Bearer " + signedToken,
    expires: expiresIn}
  }catch (error) {
    return res.status(401).json({ success: false, msg: "Something when wrong please try again" });
  }
}


module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT