const APP_ID = require('./server/ebay.config').APP_ID

var browserify = require('browserify-middleware');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var ebay = require('ebay-api');
var axios = require('axios');
var Promise = require('mpromise');
var helpers = require('./helpers');
var cors = require('cors');
var cron = require('./cronScan.js');
var dressesGetter = require('./api_calls/dresses.js');
var dressesCache = require('./cache/dresses.js');

var Current = require('./schema').Current

var port = 8000
app.set('port', port);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', port)
});

app.use('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/style.css'))
});

app.use(express.static(path.join(__dirname, './dist')));

app.use(bodyParser.json());

app.use(cors());

var categories = {
  11450: 'Clothing & Accessories',
  15724: 'Womens clothing',
  63861: 'Dresses',
  dresses: 63861
}


app.get('/getStuff', function(req, res) {
  dressesGetter()
  res.status(200)
  res.end()
})

app.get('/dresses', function(req, res) {
  var dataObj = {data: dressesCache.brands, pageCount: dressesCache.brands.length, brandsCount: dressesCache.brandsCount}
  res.status(200)
  res.send(dataObj)
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))
})








