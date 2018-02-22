'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Goblin = require('../model/goblin.js');

module.exports = function(goblinRouter){

  goblinRouter.get('/api/goblin', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('goblin', req.url.query.id)
        .then( goblin => {
          response.sendJSON(res, 200, goblin);
        })
        .catch( err => {
          console.error(err);
          response.sendText(res, 404, 'route not found');
        });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
  
  goblinRouter.post('/api/goblin', function(req, res) {
    try {
      var goblin = new Goblin(req.body.name, req.body.type);
      storage.createItem('goblin', goblin);
      response.sendJSON(res, 200, goblin);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
  
  goblinRouter.delete('/api/gobin', function(req, res) {
    if(req.url.query.id) {
      storage.deleteItem('goblin', req.url.query.id)
        .then( () => {
          response.sendText(res, 204, 'no content in the body: goblin has been deleted');
        })
        .catch( err => {
          console.error(err);
          response.sendText(res, 400, 'bad request');
        });
    }
  });
};