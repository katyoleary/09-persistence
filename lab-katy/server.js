'use strict';

const http = require('http');
const Goblin = require('./model/goblin.js');
const Router = require('./lib/router.js');
const goblinRoutes = require('./route/goblin-route.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const goblinRouter = new Router();

goblinRoutes(goblinRouter);

const server = http.createServer(goblinRouter.route());

server.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});

