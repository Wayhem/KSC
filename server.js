const express = require('express');
const next = require('next');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    const server = express();
    //const showRoutes = require("./routes/index.js");

    //server.use("/api", showRoutes);

    //server.use(handler);

    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  });