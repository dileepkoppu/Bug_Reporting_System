const appRoot = require("app-root-path")
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

const pathToPubKey = appRoot+'/id_rsa_pub.pem';
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');
const { Bugreport } = require(appRoot+"/models/bugreportModel")



const checkauth=(req, res, next)=> {
  try {
    const tokenParts = req.headers.authorization.split(' ');
    if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] });
      req.jwt = verification;
      next();
    } 
    else{
      res.status(401).json({ success: false, "message": "You are not authorized to visit this route" })
    }
  }catch (error) {
    res.status(401).json({ success: false, "message": "You are not authorized to visit this route" });
}}


module.exports.checkauth = checkauth