const { ItemIds, Category, Current } = require('../../schema');

const createMongoPromiseQuery = (categoryCode, Table) => {
	// build query to get previously fetched item ids from mongo DB
	let query = Table.find({category: categoryCode}, function(err, result) {
	  if (err) {
	  	console.log(`there was an error retrieving previous elements from ${Table} table in MongoDB.`)
	  }
	})

// `.exec()` gives you a fully-fledged promise
	return query.exec();
}

const createAndSaveItemIdsBlob = (categoryCode, filteredIDS) => {
	let newItemIds = new ItemIds({
	  created: new Date(),
	  category: categoryCode,
	  ids: filteredIDS
	})

	//Save the new batch of item ids
	newItemIds.save(function(err, data) {
	  if (err) {
	    console.log('Major creation fail when saving new IDs');
	  } 
	});
}

const createAndSaveCategoryBlob = (categoryCode, currentlyFetchedBrands) => {
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
}

const createAndSaveCurrentBlob = (categoryCode, cache) => {
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
}

module.exports.createMongoPromiseQuery = createMongoPromiseQuery;
module.exports.createAndSaveItemIdsBlob = createAndSaveItemIdsBlob;
module.exports.createAndSaveCategoryBlob = createAndSaveCategoryBlob;
module.exports.createAndSaveCurrentBlob = createAndSaveCurrentBlob;