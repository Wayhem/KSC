const express = require('express');
const next = require('next');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/index');
var dburl = process.env.DATABASEKSC || 'mongodb://localhost:27017/ksc_db';

mongoose.connect(dburl, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
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

    server.use("/", indexRoutes);

    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  });