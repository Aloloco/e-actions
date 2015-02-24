var express = require('express');

var app = express();

// the petitions handler
var petitions = require('./src/petitions')({
  host: "localhost:9200",
  indexName: "e-actions-test",
  typeName: "petitions"
});

// the app
var gui = require('./routes/gui')(petitions);
app.use('/', gui);

// the api
var petitions = require('./routes/petitions')(petitions);
app.use('/api/petitions', petitions);

// start the server
var server = app.listen(3000, function() {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})