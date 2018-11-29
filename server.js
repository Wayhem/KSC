const express = require('express');
const next = require('next');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var User = require('./models/user');
var dburl = process.env.DATABASEKSC || 'mongodb://localhost:27017/ksc_db';
let jwt = require('jsonwebtoken');
let config = require('./config');

mongoose.connect(dburl, { useNewUrlParser: true });
const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ 
      extended: true
    }));
    server.use(bodyParser.json());

    server.post('/register', (req, res) => {
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
          return res.redirect('/');
        }
      });
    });

    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  });