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
var cron = require('./cronScan.js')
var dressesGetter = require('./api_calls/dresses.js')

var Current = require('./schema').Current

var port = 3302
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

app.post('/gather', function(req, res) {

  var query = Current.find({category: categories['dresses']}, function(err, currentBrands) {
    if (err) {
      res.status(404);
      res.end();
    }
  })
  var promise = query.exec();
  promise.then(function (current) {
    
    var data = []
    var start = (req.body.page * 50) - 50
    var end = req.body.page * 50 <= current.length - 1 ? req.body.page * 50: current.length - 1
    console.log('end is', end)
    for (let i = start; i < end; i++) {
      data.push(current[current.length - 1].info[i])
    }

    console.log('************* REQUESTED THE DATA *******************', data)
    res.status(200)
    res.send(data)
  })
})







