const APP_ID = require('../server/ebay.config').APP_ID

var Promise = require('mpromise');
var helpers = require('../helpers');
var _ = require('underscore-node');
var ebay = require('ebay-api');
var axios = require('axios');

var Category = require('../schema').Category
var ItemIds = require('../schema').ItemIds
var Current = require('../schema').Current

var categories = {
  11450: 'Clothing & Accessories',
  15724: 'Womens clothing',
  63861: 'Dresses',
  dresses: '63861'
}

var otherOptions = {
  freeShipping: 'itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&',
  sortByPrice: 'itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&'
}

var getAllEbayData = (categoryCode, cache) => {

	var url = `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&` +
	  `SERVICE-VERSION=1.13.0&SECURITY-APPNAME=${APP_ID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&` + 
	  `categoryId=${categoryCode}&` +
	  `outputSelector=SellingStatus&` + 
	  `outputSelector=AspectHistogram&` + 
	  `paginationInput.entriesPerPage=100&` + 
	  `itemFilter(0).name=Condition&itemFilter(0).value=3000&` +
	  `itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&` +
	  `paginationInput.pageNumber=` 

	async function getSoldListingsAsync(){
	    // The await keyword saves us from having to write a .then() block.
	    var data = []
	    for (var i = 2; i > 0; i--) {
	      console.log('@@@@@@@@@@@', i, 'category ----- ', categoryCode)
	      data.push(await axios.get(url + i));

	    }

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
	.then(function(result) { // ******* GET ORIGINAL LISTING INFO FOR ITEMS JUST RETRIEVED FROM ABOVE ASYNC FUNCTION********
	  
	  var filtered = []
	  // get previously fetched item ids from mongo DB
	  var query = ItemIds.find({category: categoryCode}, function(err, ids) {
	    if (err) {
	    	console.log('there was an error retrieving previous id\'s for comparison.')
	    }
	  })

	  // `.exec()` gives you a fully-fledged promise
	  var promise = query.exec();
	  promise.then(function (ids) {
	  	// If item ids fetched from eBay have already been retrieved before, only keep unique ones.
	    filtered = helpers.unique(ids, result)
	    var newItemIds = new ItemIds({
	      created: new Date(),
	      category: categoryCode,
	      ids: filtered
	    })

	    //Save the new batch of item ids
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
	      // Since eBay only allows fetching 20 items at a time, async loop over all items 20 at a time
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
	    	// Other info details I may use in the future
		      // Get price - obj.ConvertedCurrentPrice.Value from w/in first for loop
		      // Get EndTime - var date = new Date(obj.EndTime) date.toLocaleDateString()	

		    // Get all saved queries from specified category
	      var query = Category.find({category: categoryCode}, function(err, currentBrands) {
	        if (err) {
	        	console.log('failed to find in Category')
	        }
	      })

	      var promise = query.exec();
	      promise.then(function (current) {
	      	// using previously queiried data from eBay, use helper function to build new object from old and new data
	        var brands = helpers.createBrandsObj(result, current)
	        return brands
	      })
	      .then(function(brands) {
	      	// create object to save to DB
	        var newCategoryObj = new Category({
	          created: new Date(),
	          category: categoryCode,
	          brands: brands.current
	        })
	        // Save newly queried items from eBay to DB (not the combined object data from the helpers).
	        newCategoryObj.save(function(err, data) {
	          if (err) {
	            console.log('Failed to create newly combined object data');
	          } 
	        });
	        
	        return brands.joined
	      })
	      .then(function(brands){
	        // sort newly combined object data by value 
	        var sortedBrands = helpers.sortObj(brands)

	        // create cache for front end
	        cache.brandsCount = sortedBrands.length
	        cache.brands = []
	        var data = []
	        for (let i = 0; i < sortedBrands.length; i++) {
	        	data.push(sortedBrands[i])
	        	// create pagination in 50 item increments
	        	if ((i % 50 === 0 && i !== 0) || i === sortedBrands.length - 1) {
	            cache.brands.push(data)
	            data = []
	          }
	        }

	      	console.log('SAVING THE DRESSES and length', cache.brands.length)
	        var newCurrentObj = new Current({
	          category: categoryCode,
	          info: cache,
	          created: new Date()
	        })

	        newCurrentObj.save(function(err, data) {
	          if (err) {
	            console.log('Major creation fail');
	          } 
	          console.log('********* FINISHED *********')
	          // console.log('saved current object', data)
	        });


	      })
	      .catch(function(error) {
	        console.log('error in promise', error)
	      })
	    })
	    .catch(function(err){console.log('error', err)})
	  })
	});
}

module.exports = getAllEbayData