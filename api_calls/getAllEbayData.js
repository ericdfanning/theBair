const ebay = require('ebay-api');
const axios = require('axios');
const APP_ID = require('../server/ebay.config').APP_ID
let emailService = require('../server/emailService/emailService.js');

// ******* START: Exports from other files
const { getOnlyEndedWithSalesIDS, unique, createBrandsObj, combineAll, sortObj } = require('./helpers/transformationHelpers');
const { createMongoPromiseQuery, createAndSaveItemsIdBlob, createAndSaveCategoryBlob, createAndSaveCurrentBlob } = require('./helpers/mongoHelpers');
const { ItemIds, Category, Current } = require('../schema');
const categoryUrlCreator = require('./categoryGetter').url;
const categoryGetter = require('./categoryGetter');
const getBrandNamesAsync = require('./idsGetter');
const categories = require('./categoriesList');
// ******** END

// let otherOptions = {
//   freeShipping: 'itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&',
//   sortByPrice: 'itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&'
// }

const getAllEbayData = (categoryCode, cache) => {
	// console.log('category', categoryCode, cache)

	categoryGetter(categoryCode)
	  .then( function(result) {
		    // get selling price: result[0].data.findCompletedItemsResponse[0].searchResult[0].item[0].sellingStatus[0].convertedCurrentPrice[0].__value__
		    return getOnlyEndedWithSalesIDS(result)
		})
		.catch(function(err){console.log('-------FIRST CATCH ERROR TO GET CATEGORIES & IDS--------------------------')})
		.then(function(result) { // ******* GET ORIGINAL LISTING INFO FOR ITEMS JUST RETRIEVED FROM ABOVE ASYNC FUNCTION********
		  
		  let idsPromise = createMongoPromiseQuery(categoryCode, ItemIds);
		  // execute query from above
		  idsPromise.then(function (ids) {
		  	// If listing ids fetched from eBay have already been retrieved before, only keep unique ones.
		    let filteredIDS = unique(ids, result) || [];

		    createAndSaveItemsIdBlob(categoryCode, filteredIDS);

	    	getBrandNamesAsync(filteredIDS)
	    		.then(function(result) {
	
			      let currentlyFetchedBrands = createBrandsObj(result)
		      	// create object to save to DB
		      	if (Object.keys(currentlyFetchedBrands).length > 0) {
		      		console.log('currentlyFetchedBrands is NOT empty')
			        createAndSaveCategoryBlob(categoryCode, currentlyFetchedBrands);
		        } else {
		        	console.log('ITS EMPTY_____NOTHING WAS SAVED')
		        }

	          let categoriesPromise = createMongoPromiseQuery(categoryCode, Category);

	          categoriesPromise.then(function(savedCurrentBrands) {

			        // sort newly combined object data by value
			        let combinedBrands = combineAll(savedCurrentBrands) //combine saved data
							let sortedBrands = sortObj(combinedBrands)

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
			        	createAndSaveCurrentBlob(categoryCode, cache);
							} else {
			        	console.log(`NO CURRENT INFO ADDED FOR ________${categories[categoryCode]}`, cache.brands.length, '. Using old cache')
			        }
			      })
			      .catch((err) => console.log('ERROR IS CATEGORIES FROM MONGODB ITEM RETRIEVAL PROMISE'))
			    })
			    .catch(function(err){console.log('ERROR CALLING EBAY API TO GET BRAND NAMES BY ID')})
		  })
		});
}

module.exports = getAllEbayData