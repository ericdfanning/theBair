const allCategoriesCache = require('../cache/allCategoriesCache.js');
const { Current } = require('../schema');
const { createCurrentCategoryQuery } = require('../api_calls/helpers/mongoHelpers');
const { categoryListArray } = require('../api_calls/categoriesList');

const makeQuery = function(x){
	console.log('MAKING QUERY BEFORE IF', categoryListArray[x].name)
  if( x < categoryListArray.length) {
  		let promise = createCurrentCategoryQuery(categoryListArray[x].id)

  	  promise.then( (current) => {
  	    allCategoriesCache[categoryListArray[x].name].brands = current[current.length - 1].info[0].brands
  	    allCategoriesCache[categoryListArray[x].name].brandsCount = current[current.length - 1].info[0].brandsCount
  	    makeQuery(x+1);
  	  })
  	  .catch( err => {
  	  	console.log(`!!!!! Something went wrong in initial startup mongo query for ${categoryListArray[x].id}`, err)
  	  	makeQuery(x+1);
  	  })
  }
};

makeQuery(0);
