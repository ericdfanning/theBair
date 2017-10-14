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

var getAllEbayData = require('./api_calls/getAllEbayData.js');

var allCategoriesCache = require('./cache/allCategoriesCache.js');

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
  dresses: '63861',
  tshirts: '63869',
  topsAndBlouses: '53159',
}

const gettersHousing = () => {
  getAllEbayData(categories.dresses, allCategoriesCache.dresses)
  getAllEbayData(categories.tshirts, allCategoriesCache.tshirts)
  getAllEbayData(categories.topsAndBlouses, allCategoriesCache.topsAndBlouses)
}

app.get('/getStuff', function(req, res) {
  gettersHousing()
  res.status(200)
  res.end()
})

app.get('/Dresses', function(req, res) {
  console.log('inside dresses')
  var dataObj = {
    data: allCategoriesCache.dresses.brands,
    pageCount: allCategoriesCache.dresses.brands.length,
    brandsCount: allCategoriesCache.dresses.brandsCount
  }
  res.status(200)
  res.send(dataObj)
})

app.get('/T-Shirts', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.tshirts.brands,
      pageCount: allCategoriesCache.tshirts.brands.length,
      brandsCount: allCategoriesCache.tshirts.brandsCount
  }
  console.log('inside tshirts',allCategoriesCache.tshirts.brands.length )
  res.status(200)
  res.send(dataObj)
})

app.get('/Tops/Blouses', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.topsAndBlouses.brands,
      pageCount: allCategoriesCache.topsAndBlouses.brands.length,
      brandsCount: allCategoriesCache.topsAndBlouses.brandsCount
  }
  console.log('inside topsAndBlouses', allCategoriesCache.topsAndBlouses.brands.length)
  res.status(200)
  res.send(dataObj)
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))
})


module.exports = gettersHousing





