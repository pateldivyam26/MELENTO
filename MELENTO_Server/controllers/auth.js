
const user_service=require('../service/userService')
const utils=require('../utility/util')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function login(req, res) {
    const email=req.body.email;
    const password=req.body.password;
    const passswordEncrypt=utils.encrypt(password);
    user_service.find().then(
        (items) => {
            const objArr = items;
            const user=verify_login(email,objArr);
            // console.log(user);
            if(Object.keys(user).length === 0){
                res.status(404).send({message:"Wrong Credentials"});
                return;
            }
            if(passswordEncrypt!=user.password){
                res.status(404).send({message:"Wrong Credentials"});
                return;
            }
            apiKey = process.env.secretKey;
            // console.log(apiKey);
            const token = jwt.sign({user},apiKey,
                {
                  algorithm: 'HS256',
                  allowInsecureKeySizes: true,
                  expiresIn: 86400, // 24 hours
                });
            return res.status(200).send({ message: "User Logged in Successfully", token,user })
        },
        (err) => {
            console.log('Promise Rejected')
            console.log(err)
        }  
    )
}

function verify_login(email, objArr) {
    const user = objArr.find(element => element.email === email);
    return user || {};
}
function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send("Authorization failed. No access token.");
      }
    jwt.verify(token, process.env.secretKey, (err, user) => {
        if (err) {
          console.log(err);
          return res.status(403).send("Could not verify token");
        }
        req.user = user;
      });
      next();  
}
function verifyRegisterDetails(req,res,next){
    const email=req.body.email;
    user_service.find().then(
        (items) => {
            const objArr = items;
            const userExists=verify_email(email,objArr);
            // console.log(userExists);
            if(userExists){
                // Send a response instead of throwing an error
                res.status(400).send("User already exists");
                return; // Return to prevent calling next()
            }
            next();

        },
        (err) => {
            console.log('Promise Rejected')
            console.log(err)
        }  
    )
}
function verify_email(email,objArr){
    var val=objArr.find(element => element.email === email);
    if(val){
        return true;
    }
    return false;
   
}

module.exports = {login,authenticateToken,verifyRegisterDetails}