var express = require('express');

var app = express();

// home middleware
app.get('/', function (req, res) {
  res.send('E-Action Middleware')
})


// use a router for petitions
var petitions = require('./routes/petitions');
app.use('/petitions', petitions);


// start the server
var server = app.listen(3000, function() {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})