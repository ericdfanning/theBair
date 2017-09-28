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
var tshirtsGetter = require('./api_calls/tshirts.js');
var dressesCache = require('./cache/dresses.js');
var tshirtsCache = require('./cache/tshirts.js');
var topsAndBlousesGetter = require('./api_calls/topsAndBlouses.js');
var topsAndBlousesCache = require('./cache/topsAndBlouses.js');

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

app.get('/getStuff', function(req, res) {
  dressesGetter()
  tshirtsGetter()
  topsAndBlousesGetter()
  res.status(200)
  res.end()
})

// app.get('/gather', function(req, res) {

//   var dataObj = {
//     access: {
//       data: tshirtsCache.brands, pageCount: tshirtsCache.brands.length, brandsCount: tshirtsCache.brandsCount
//     },
//     dresses: {
//       data: dressesCache.brands, pageCount: dressesCache.brands.length, brandsCount: dressesCache.brandsCount
//     }
//   }
//   res.status(200)
//   res.send(dataObj)
// })

app.get('/Dresses', function(req, res) {
  console.log('inside dresses')
  var dataObj = {
    data: dressesCache.brands,
    pageCount: dressesCache.brands.length,
    brandsCount: dressesCache.brandsCount
  }
  res.status(200)
  res.send(dataObj)
})

app.get('/T-Shirts', function(req, res) {
  var dataObj = {
      data: tshirtsCache.brands,
      pageCount: tshirtsCache.brands.length,
      brandsCount: tshirtsCache.brandsCount
  }
  console.log('inside tshirts',tshirtsCache.brands.length )
  res.status(200)
  res.send(dataObj)
})

app.get('/Tops/Blouses', function(req, res) {
  var dataObj = {
      data: topsAndBlousesCache.brands,
      pageCount: topsAndBlousesCache.brands.length,
      brandsCount: topsAndBlousesCache.brandsCount
  }
  console.log('inside topsAndBlousesCache', topsAndBlousesCache)
  res.status(200)
  res.send(dataObj)
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))
})








