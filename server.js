var browserify = require('browserify-middleware');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var ebay = require('ebay-api');
var axios = require('axios');
var _ = require('underscore-node');
var Promise = require('mpromise');
var helpers = require('./helpers');
const APP_ID = require('./server/ebay.config').APP_ID


var Current = require('./schema').Current
var Category = require('./schema').Category
var ItemIds = require('./schema').ItemIds

var port = 8000
app.set('port', port);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', port)
});

app.use('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/style.css'))
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/bundle.js');

app.use(express.static(path.join(__dirname, './dist')));

var categories = {
  11450: 'Clothing & Accessories',
  15724: 'Womens clothing',
  63861: 'Dresses',
  dresses: 63861
}

var otherOptions = {
  freeShipping: 'itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&',
  sortByPrice: 'itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&'
}

var dataReady = {
  dresses: [],
  shoes: []
}

app.get('/getStuff', function(req, res) {

  var url = `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&` +
    `SERVICE-VERSION=1.13.0&SECURITY-APPNAME=${APP_ID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&` + 
    `categoryId=${categories.dresses}&` +
    `outputSelector=SellingStatus&` + 
    `outputSelector=AspectHistogram&` + 
    `paginationInput.entriesPerPage=100&` + 
    `itemFilter(0).name=Condition&itemFilter(0).value=3000&` +
    `itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&` +
    `paginationInput.pageNumber=` 

  async function getSoldListingsAsync(){
      // The await keyword saves us from having to write a .then() block.
      var data = []
      for (var i = 1; i > 0; i--) {
        console.log('@@@@@@@@@@@@', i)
        data.push(await axios.get(url + i));
      }

      // The result of the GET request is available in the json variable.
      // We return it just like in a regular synchronous function.
      console.log('**********************$$$$$$***********', data.length)
      return data;
  }

  getSoldListingsAsync().then( function(result) {
      // selling price below
      console.log('#######', result[0].data.findCompletedItemsResponse[0].searchResult[0].item[0].sellingStatus[0].convertedCurrentPrice[0].__value__)
      var ids = []
      result.forEach(v => {
        for (var obj of v.data.findCompletedItemsResponse[0].searchResult[0].item) {
          if (obj.sellingStatus[0].sellingState[0] === 'EndedWithSales') {
            ids.push(obj.itemId[0])
          } 
        }
      })
      var final = _.uniq(ids)
      return final
  })
  .catch(function(err){console.log('error', err)})
  .then(function(result) {
    // ******* GET ORIGINAL LISTING INFO FOR ITEMS ABOVE ********
    var filtered = []
    var query = ItemIds.find({category: categories['dresses']}, function(err, ids) {
      if (err) {
        res.status(404);
        res.end();
      }
    })

    // `.exec()` gives you a fully-fledged promise
    var promise = query.exec();
    promise.then(function (ids) {
      filtered = helpers.unique(ids, result)
      var newItemIds = new ItemIds({
        created: new Date(),
        category: '63861',
        ids: filtered
      })

      newItemIds.save(function(err, data) {
        if (err) {
          console.log('Major creation fail');
        } 
      });


    var url = `http://open.api.ebay.com/shopping?` +
      `callname=GetMultipleItems&` +
      `responseencoding=JSON&` +
      `appid=${APP_ID}&` +
      `siteid=0&` +
      `version=967&` +
      `IncludeSelector=ItemSpecifics&` +
      `ItemID=`

    var urlExtension = '';

      async function getBrandNamesAsync(){
        var items = []
        var ids = []
        // console.log('filtered length before multiple get', filtered.length)
        for (var i = 0; i <= filtered.length; i++) {
          if (ids.length === 20 || i === filtered.length) {
            console.log('every 20', i)
            items.push(await axios.get(url + ids.join(',')));
            ids = [];
            ids.push(filtered[i]);
          } else {
            ids.push(filtered[i]);
          }
        }
        return items;
      }

      getBrandNamesAsync().then( function(result) {
        // Get price - obj.ConvertedCurrentPrice.Value from w/in first for loop
        // Get EndTime - var date = new Date(obj.EndTime) date.toLocaleDateString()
        // console.log('multiple items request from filtered data', result.length)
        var query = Category.find({category: categories['dresses']}, function(err, currentBrands) {
          if (err) {
            res.status(404);
            res.end();
          }
        })
        var promise = query.exec();
        promise.then(function (current) {
          var brands = helpers.createBrandsObj(result, current)
          return brands
        })
        .then(function(brands) {
          var newCategoryObj = new Category({
            created: new Date(),
            category: categories['dresses'],
            brands: brands.current
          })

          newCategoryObj.save(function(err, data) {
            if (err) {
              console.log('Major creation fail');
            } 
          });
          
          return brands.joined
        })
        .then(function(brands){
          //sort by value and put in an local array for quick access
          var sortedBrands = helpers.sortObj(brands)
          dataReady.dresses = sortedBrands
          var newCurrentObj = new Current({
            category: categories['dresses'],
            info: sortedBrands,
            created: new Date()
          })

          newCurrentObj.save(function(err, data) {
            if (err) {
              console.log('Major creation fail');
            } 
            console.log('saved current object', data)
          });

          res.status(200)
          res.end()
        })
        .catch(function(error) {
          console.log('error in promise', error)
          res.status(404)
          res.end()
        })
      })
      .catch(function(err){console.log('error', err)})
    })
  });

})

app.get('/gather', function(req, res) {

  var query = Current.find({category: categories['dresses']}, function(err, currentBrands) {
    if (err) {
      res.status(404);
      res.end();
    }
  })
  var promise = query.exec();
  promise.then(function (current) {
    console.log('************* REQUESTED THE DATA *******************', current.length)
    res.status(200)
    res.send(current[current.length - 1].info)
  })
})







