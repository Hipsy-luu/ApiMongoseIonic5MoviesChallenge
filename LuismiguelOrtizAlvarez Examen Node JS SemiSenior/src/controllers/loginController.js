/* eslint-disable no-unused-vars */
const async = require('async');
const bcrypt = require('bcrypt');
const User = require('./../models/user.schema');
const jwt = require('jsonwebtoken');
var serverConf = require('./../config/config');

//Se importa el logger
//const logger = require('./../utils/logger');

const jwtKey = serverConf.key;

/* 
 Example body : 
  {
    "email" : "luismi.luu@gmail.cosm",
    "password" : "qwertyuiop"
  }
*/
module.exports = {
  login: (req, res, next)=>{
    async.parallel({
      user: (callback) =>{
        User.findOne({ email: req.body.email })
            /* .select('_password _salt') */
            .exec(callback)
      }
    }, (err, result)=>{
      if(result.user){
        bcrypt.hash(req.body.password, result.user.salt, (err, hash)=>{
          if(hash === result.user.password){
            let token = jwt.sign(result.user.id, jwtKey);
            res.status(200).json({
                message: "Correct login",
                error: true,
                data: {
                  token : token,
                }
            });
          }else{
            res.status(200).json({
                message: 'Invalid password.',
                error: true
            });
          }
        });
      }else{
        res.status(200).json({
            message: 'Invalid request.',
            error: true
        });
      }
    });
  }
};
