const APP_ID = require('./server/ebay.config').APP_ID
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./server/routes.js');
const cors = require('cors');
const cron = require('./cronScan.js');
const cron2 = require('./server/emailService/emailCronJob.js');
const makeInitialAPICalls = require('./server/makeInitialAPICall.js');
const makeInitialMongoQueryToSetCache = require('./server/makeInitialMongoQueryToSetCache');

const port = 8000
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

// var Category = require('./schema').Category
// var ItemIds = require('./schema').ItemIds
// })



