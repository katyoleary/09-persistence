'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  //here were starting to do validation checks- checking parameters passed into the function
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!item) return Promise.reject(new Error('expected item'));
  if(!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][item.id]= item;

  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema name'));
    if(!id) return reject(new Error('expected id'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));

    var item = schema[id];
    if(!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

exports.deleteItem = function(schemaName, id) {
  
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!id) return Promise.reject(new Error('expected id'));

  var item = storage[schemaName][id];
  item.delete();

  return Promise.resolve(item);
};
