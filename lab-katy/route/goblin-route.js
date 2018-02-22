'use strict';

const storage = require('../lib/storage.js');
const gobin = require('../model.goblin.js');
const Goblin = require('../model/goblin.js');

module.exports = function(goblinRouter){

  goblinRouter.get('/api/goblin', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('goblin', req.url.query.id)
        .then( goblin => {
          res.writeHead(200, {
            'Content-Type': 'text/plain',
          });
          res.write(JSON.stringify(goblin));
          res.end();
        })
        .catch( err => {
          console.error(err);
          res.writeHead(404, {
            'Content-Type': 'text/plain',
          });
          res.write('route not found');
          res.end();
        });
      return;
    }
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  });
  
  goblinRouter.post('/api/goblin', function(req, res) {
    try {
      var goblin = new Goblin(req.body.name, req.body.type);
      storage.createItem('goblin', goblin);
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(JSON.stringify(goblin));
      res.end();
    } catch (err) {
      // console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    }
  });
  
  goblinRouter.delete('/api/gobin', function(req, res) {
    if(req.url.query.id) {
      storage.deleteItem('goblin', req.url.query.id)
        .then( () => {
          res.writeHead(204, {
            'Content-Type': 'text/plain',
          });
          res.write('no content in the body: goblin has been deleted');
          res.end();
        })
        .catch( err => {
          console.error(err);
          res.writeHead(400, {
            'Content-Type': 'text/plain',
          });
          res.write('bad request');
          res.end();
        });
    }
  });
}