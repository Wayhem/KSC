const express = require('express');
var router = express.Router();
var User = require('../models/user');
const checkToken = require('../middleware/checktoken');
let jwt = require('jsonwebtoken');
let config = require('../config');

router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let token = jwt.sign({username: username},
      config.secret,
      { expiresIn: '24h' // expires in 24 hours
      }
    );    

    let newUser = new User({
      username: username,
      password: password,
      id_token: token
    });

    User.create(newUser, function (err, user){
      if (err) {
        return res.redirect('/home');
      }
      return res.send(user)
    });
  });
  
  router.post('/token', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.find({username: username}, (err, foundUser)=>{
      if(err) {
        console.log(err);
      } else {
        if (password == foundUser[0].password){
          let token = jwt.sign({username: foundUser[0].username},
            config.secret,
            { expiresIn: '24h' // expires in 24 hours
            }
          );
          User.findOneAndUpdate({username:foundUser[0].username}, { id_token: token }, (err, foundUser) =>{
            if(err){
              console.log(err);
            } else {
              //foundUser is not the updated one
              User.find({username: foundUser.username}, (err, foundUser) =>{
                if (err) {
                  console.log(err);
                } else {
                  return res.send(foundUser[0]); 
                }
              });
            }
          });
        } else {
          return res.redirect('/home');
        }
    }
    });
  });

  router.get('/user', checkToken, (req, res) => {
    jwt.verify(req.token, config.secret, (err, authorizedData) => {
      if(err){
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          //If token is successfully verified, we can send the autorized data 
          User.find({id_token: req.token}, (err, foundUser)=>{
            if(err){
              console.log(err);
            } else {
            return res.send(foundUser[0]);
            } 
          });
      }
    })
  });

  router.put('/user', checkToken, (req, res) => {
    jwt.verify(req.token, config.secret, (err, authorizedData) => {
      if(err){
        //If error send Forbidden (403)
        console.log('ERROR: Could not connect to the protected route');
        res.sendStatus(403);
      } else {
        //If token is successfully verified, we can send the autorized data
        if (req.body.campaign){ 
          User.findOneAndUpdate({id_token: req.token}, {$push: {campaign: {address: req.body.campaign}}}, (err, foundUser)=>{
            if(err){
              console.log(err);
            } else{
              //found  user not the updated one
              User.find({username: foundUser.username}, (err, foundUser) =>{
                if (err) {
                  console.log(err);
                } else {
                  return res.send(foundUser); 
                }
              }); 
            }
          });
        } else if (req.body.contri) {
          User.findOneAndUpdate({id_token: req.token}, {$push: {contributeIn: {address: req.body.contri }}}, (err, foundUser)=>{
            if(err){
              console.log(err);
            } else{
              //found  user not the updated one
              User.find({username: foundUser.username}, (err, foundUser) =>{
                if (err) {
                  console.log(err);
                } else {
                  return res.send(foundUser); 
                }
              }); 
            }
          });
        }
      }
    })
  });

  router.get("/", (req, res) => {
    return res.redirect('/home');
  });

  module.exports = router;