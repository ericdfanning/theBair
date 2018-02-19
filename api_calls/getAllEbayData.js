const Promise = require('mpromise');
const helpers = require('../helpers');
const _ = require('underscore-node');
const ebay = require('ebay-api');
const axios = require('axios');
const APP_ID = require('../server/ebay.config').APP_ID
let emailService = require('../server/emailService/emailService.js');

// ******* START: Exports from other files
const Category = require('../schema').Category
const ItemIds = require('../schema').ItemIds
const Current = require('../schema').Current
const categoryUrlCreator = require('./categoryGetter').url
const categoryGetter = require('./categoryGetter')
const getBrandNamesAsync = require('./idsGetter')
// ******** END
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
	// console.log('category', categoryCode, cache)

	categoryGetter(categoryCode)
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
		.catch(function(err){console.log('-------FIRST CATCH ERROR TO GET CATEGORIES --------------------------', err)})
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

	    	getBrandNamesAsync(filtered)
	    		.then(function(result) {
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