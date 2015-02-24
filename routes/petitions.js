// Routes for petitions;
var express = require('express');
var app = express();

var router = express.Router();

var handler = require('../src/petitions');

module.exports = function(handler) {

  // list all the petitions
  router.get('/', function(req, res, next) {
    throw new Error('not implemented');
  });

  // return a petition
  router.get('/:id', function(req, res, next) {
    throw new Error('not implemented');
  });

  // create a petition
  router.post('/', function(req, res, next) {
    throw new Error('not implemented');
  });

  // update a petition
  router.put('/:id', function(req, res, next) {
    throw new Error('not implemented');
  });

  // delete a petition
  router.delete('/:id', function (req, res, next) {
    throw new Error('not implemented');
  });

  return router;

}


