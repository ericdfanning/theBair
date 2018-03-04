const getAllEbayData = require('../api_calls/getAllEbayData.js');
const allCategoriesCache = require('../cache/allCategoriesCache.js');
const { categoryListArray } = require('../api_calls/categoriesList');

let counter = 0

module.exports.throttleCB = () => {
  counter++
  module.exports.gettersHousing()
}

module.exports.gettersHousing = () => {
  if( counter < categoryListArray.length) {
    getAllEbayData(categoryListArray[counter].id, allCategoriesCache[categoryListArray[counter].name])
  } else if (counter === categoryListArray.length) {
    counter = 0
  }
};

module.exports.gettersHousing()