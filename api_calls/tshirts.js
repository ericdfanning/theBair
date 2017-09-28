const APP_ID = require('../server/ebay.config').APP_ID

var Promise = require('mpromise');
var helpers = require('../helpers');
var _ = require('underscore-node');
var ebay = require('ebay-api');
var axios = require('axios');

var Category = require('../schema').Category
var ItemIds = require('../schema').ItemIds
var Current = require('../schema').Current

var tshirtsCache = require('../cache/tshirts');

var categories = {
  11450: 'Clothing & Accessories',
  15724: 'Womens clothing',
  63861: 'Dresses',
  dresses: '63861',
  tshirts: '63869',

}

var otherOptions = {
  freeShipping: 'itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&',
  sortByPrice: 'itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&'
}

var dataReady = {
  dresses: [],
  shoes: []
}

var tshirts = () => {
	var url = `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&` +
	  `SERVICE-VERSION=1.13.0&SECURITY-APPNAME=${APP_ID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&` + 
	  `categoryId=${categories.tshirts}&` +
	  `outputSelector=SellingStatus&` + 
	  `outputSelector=AspectHistogram&` + 
	  `paginationInput.entriesPerPage=100&` + 
	  `itemFilter(0).name=Condition&itemFilter(0).value=3000&` +
	  `itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&` +
	  `paginationInput.pageNumber=`  

	async function getSoldListingsAsync(){
	    // The await keyword saves us from having to write a .then() block.
	    var data = []
	    for (var i = 10; i > 0; i--) {
	      console.log('@@@@@@@@@@@', i)
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
	.then(function(result) {
	  // ******* GET ORIGINAL LISTING INFO FOR ITEMS ABOVE ********
	  var filtered = []
	  var query = ItemIds.find({category: categories['tshirts']}, function(err, ids) {
	    if (err) {
	    	console.log('FAILED TO SAVE ITEM IDS')
	    }
	  })

	  // `.exec()` gives you a fully-fledged promise
	  var promise = query.exec();
	  promise.then(function (ids) {
	    filtered = helpers.unique(ids, result)
	    var newItemIds = new ItemIds({
	      created: new Date(),
	      category: '63869',
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
	      console.log('filtered length before multiple get', filtered)
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

	      var query = Category.find({category: categories['tshirts']}, function(err, currentBrands) {
	        if (err) {
	        	console.log('failed to find in Category')
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
	          category: categories['tshirts'],
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
	      	console.log('in the saving then')
	        //sort by value and put in an local array for quick access
	        var sortedBrands = helpers.sortObj(brands)
	        dataReady.dresses = sortedBrands

	        // create cache for front end
	        tshirtsCache.brandsCount = sortedBrands.length
	        tshirtsCache.brands = []
	        var data = []
	        for (let i = 0; i < sortedBrands.length; i++) {
	        	data.push(sortedBrands[i])
	        	// create pagination in 50 item increments
	        	if ((i % 50 === 0 && i !== 0) || i === sortedBrands.length - 1) {
	            tshirtsCache.brands.push(data)
	            data = []
	          }
	        }
	        console.log('SAVING T-SHIRTS and length', tshirtsCache.brands.length)
	        var newCurrentObj = new Current({
	          category: categories['tshirts'],
	          info: tshirtsCache,
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

module.exports = tshirts
