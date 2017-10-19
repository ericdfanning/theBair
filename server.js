const APP_ID = require('./server/ebay.config').APP_ID

let browserify = require('browserify-middleware');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let path = require('path');
let ebay = require('ebay-api');
let axios = require('axios');
let router = require('./server/routes.js');
let Promise = require('mpromise');
let helpers = require('./helpers');
let cors = require('cors');
let cron = require('./cronScan.js');
let cron2 = require('./server/emailService/emailCronJob.js');
let makeInitialAPICalls = require('./server/makeInitialAPICall.js');

let getAllEbayData = require('./api_calls/getAllEbayData.js');
let allCategoriesCache = require('./cache/allCategoriesCache.js');

let port = 8000
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
  getAllEbayData(categories.dresses, allCategoriesCache.dresses)
  getAllEbayData(categories.tshirts, allCategoriesCache.tshirts)
  getAllEbayData(categories.topsAndBlouses, allCategoriesCache.topsAndBlouses)
}

module.exports.gettersHousing = gettersHousing





