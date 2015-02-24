// Routes for the gui
var express = require('express');

var app = express();
var router = express.Router();

// pass the handler for the petitions
// so we use just one instance
module.exports = function(handler) {

  router.get('/', function(req, res, next) {
    handler.getLatestPetitions(10, function(err, resp) {
      if (err) {
        return next(err);
      }

      res.send(resp);
      res.end();

    });
  });

  router.get('/:id', function(req, res, next) {
    handler.getPetitionById(req.params.id, function(err, resp) {
      if (err) {
        return next(err);
      }

      res.send(resp);
      res.end();

    })
  });

  return router;

}