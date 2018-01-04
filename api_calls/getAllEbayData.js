const APP_ID = require('../server/ebay.config').APP_ID

const Promise = require('mpromise');
const helpers = require('../helpers');
const _ = require('underscore-node');
const ebay = require('ebay-api');
const axios = require('axios');

let emailService = require('../server/emailService/emailService.js');

const Category = require('../schema').Category
const ItemIds = require('../schema').ItemIds
const Current = require('../schema').Current

// let otherOptions = {
//   freeShipping: 'itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&',
//   sortByPrice: 'itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&'
// }

const categories = { // this object used only for console logging during development
	'63861': 'Dresses',
	'63869': 'T-Shirts',
	'53159': 'Tops & Blouses',
	'45333': 'Flats',
	'63866': 'Sweaters',
	'11554': 'Jeans',
	'63862': 'Womans Coats',
	'55793': 'Heels',
	'62107': 'Womans Sandals',
	'11483': 'Mens Jeans',
	'11484': 'Mens Sweaters',
	'57991': 'Mens Dress Shirts',
	'57990': 'Mens Casual Shirts',
	'15687': 'Mens T-Shirts',
	'3002': 'Mens Blazors',
	'15662': 'Ties',
	'53120': 'Mens Dress & Formal Shoes',
	'24087': 'Mens Casual Shoes'
}

const getAllEbayData = (categoryCode, cache) => {
	console.log('category', categoryCode, cache)
	let url = `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&` +
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
	    let data = []
	    for (let i = 2; i > 0; i--) {
	      console.log('@@@@@@@@@@@', i, 'category ----- ', categoryCode)
	      data.push(await axios.get(url + i));
	    }

	    return data;
	}

	getSoldListingsAsync()
	  .then( function(result) {
		    // get selling price 
		    // result[0].data.findCompletedItemsResponse[0].searchResult[0].item[0].sellingStatus[0].convertedCurrentPrice[0].__value__

		    let ids = []
		    result.forEach(v => {
		      for (let obj of v.data.findCompletedItemsResponse[0].searchResult[0].item) {
		        if (obj.sellingStatus[0].sellingState[0] === 'EndedWithSales') {
		          ids.push(obj.itemId[0])
		        } 
		      }
		    })
		    let finalIdList = _.uniq(ids)
		    return finalIdList
		})
		.catch(function(err){console.log('error', err)})
		.then(function(result) { // ******* GET ORIGINAL LISTING INFO FOR ITEMS JUST RETRIEVED FROM ABOVE ASYNC FUNCTION********
		  
		  let filtered = []
		  // build query to get previously fetched item ids from mongo DB
		  let query = ItemIds.find({category: categoryCode}, function(err, ids) {
		    if (err) {
		    	console.log('there was an error retrieving previous id\'s for comparison.')
		    }
		  })

		  // `.exec()` gives you a fully-fledged promise
		  let promise = query.exec();
		  // execute query from above
		  promise.then(function (ids) {
		  	// If item ids fetched from eBay have already been retrieved before, only keep unique ones.
		    filtered = helpers.unique(ids, result)
		    let newItemIds = new ItemIds({
		      created: new Date(),
		      category: categoryCode,
		      ids: filtered
		    })

		    //Save the new batch of item ids
		    newItemIds.save(function(err, data) {
		      if (err) {
		        console.log('Major creation fail when saving new IDs');
		      } 
		    });


		  let idsUrl = `http://open.api.ebay.com/shopping?` +
		    `callname=GetMultipleItems&` +
		    `responseencoding=JSON&` +
		    `appid=${APP_ID}&` +
		    `siteid=0&` +
		    `version=967&` +
		    `IncludeSelector=ItemSpecifics&` +
		    `ItemID=`

		    async function getBrandNamesAsync(){
		      let items = []
		      let ids = []
		      // Since eBay only allows fetching 20 items at a time, async loop over all items 20 at a time
		      for (let i = 0; i <= filtered.length; i++) {
		        if (ids.length === 20 || i === filtered.length) {
		          // console.log('every 20', i)
		          items.push(await axios.get(idsUrl + ids.join(',')));
		          ids = [];
		          ids.push(filtered[i]);
		        } else {
		          ids.push(filtered[i]);
		        }
		        if (i === filtered.length) {
		        	console.log('finished for loop for api calls with IDs. i finished on', i)
		        }
		      }
		      return items;
		    }

		    getBrandNamesAsync().then(function(result) {
		    	// Other info details I may use in the future
			      // Get price - obj.ConvertedCurrentPrice.Value from w/in first for loop
			      // Get EndTime - let date = new Date(obj.EndTime) date.toLocaleDateString()	
			    // console.log('THE FETCHED RESULTS ARE ---', Array.isArray(result))
		      let currentlyFetchedBrands = helpers.createBrandsObj(result)
		      // console.log('brands after ---- ', typeof currentlyFetchedBrands, Array.isArray(currentlyFetchedBrands), 'key count', Object.keys(currentlyFetchedBrands).length)
	      	// create object to save to DB
	      	if (Object.keys(currentlyFetchedBrands).length > 0) {

	      		console.log('currentlyFetchedBrands is NOT empty')

		        let newCategoryObj = new Category({
		          created: new Date(),
		          category: categoryCode,
		          brands: currentlyFetchedBrands
		        })
		        // Save newly queried items from eBay to DB (not the combined object data from the helpers).
		        newCategoryObj.save(function(err, data) {
		          if (err) {
		            console.log('Failed to create newly combined object data');
		          } 
		        });
	        } else {
	        	console.log('ITS EMPTY_____NOTHING WAS SAVED')
	        }

	        // Make query for all save category objects
          let query = Category.find({category: categoryCode}, function(err, savedBrands) {})

          let promise2 = query.exec();
          // execute the promise
          // console.log('is this a promise????', promise2)
          promise2.then(function(savedCurrentBrands) {

		        // sort newly combined object data by value
		        // console.log('MONGO QUERY DATA LENGTH', savedCurrentBrands.length)
		        let combinedBrands = helpers.combineAll(savedCurrentBrands) //combine saved data
						let sortedBrands = helpers.sortObj(combinedBrands)

		        // console.log('THE SORTED BRANDS', sortedBrands.length)
		        // create cache for front end
		        cache.brandsCount = sortedBrands.length
		        cache.brands = []
		        let data = []
		        for (let i = 0; i < sortedBrands.length; i++) {
		        	data.push(sortedBrands[i])
		        	// create pagination in 50 item increments
		        	if ((i % 50 === 0 && i !== 0) || i === sortedBrands.length - 1) {
		            cache.brands.push(data)
		            data = []
		          }
		        }

		        if (Object.keys(currentlyFetchedBrands).length > 0) {
		        	console.log(`SAVING THE ${categories[categoryCode]} and length`, cache.brands.length)
			        let newCurrentObj = new Current({
			          category: categoryCode,
			          info: cache,
			          created: new Date()
			        })

			        newCurrentObj.save(function(err, data) {
			          if (err) {
			            console.log('Major creation fail');
			          } 
			          console.log('********* FINISHED *********')
			        });
		        } else {
		        	console.log(`NO CURRENT INFO ADDED FOR ___________________${categories[categoryCode]}`, cache.brands.length)
		        }
		      })
		      .catch(() => console.log('ERROR IS PROMISE TWO'))
		    })
		    .catch(function(err){console.log('SUPER ERRORRRRRRRRRRRRRRRRR', err)})
		  })
		});
}

module.exports = getAllEbayData