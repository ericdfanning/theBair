const APP_ID = require('./server/ebay.config').APP_ID

var browserify = require('browserify-middleware');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var ebay = require('ebay-api');
var axios = require('axios');
var router = require('./server/routes.js');
var Promise = require('mpromise');
var helpers = require('./helpers');
var cors = require('cors');
var cron = require('./cronScan.js');
var cron2 = require('./server/emailService/emailCronJob.js');

var getAllEbayData = require('./api_calls/getAllEbayData.js');
var allCategoriesCache = require('./cache/allCategoriesCache.js');

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
app.use('/', router);

var categories = {
  dresses: '63861',
  tshirts: '63869',
  topsAndBlouses: '53159',
}

const gettersHousing = () => {
  console.log('THE EXPRESSION WAS CALLED')
  getAllEbayData(categories.dresses, allCategoriesCache.dresses)
  getAllEbayData(categories.tshirts, allCategoriesCache.tshirts)
  getAllEbayData(categories.topsAndBlouses, allCategoriesCache.topsAndBlouses)
}


module.exports.gettersHousing = gettersHousing





