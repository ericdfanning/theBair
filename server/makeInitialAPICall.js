const getAllEbayData = require('../api_calls/getAllEbayData.js');
const allCategoriesCache = require('../cache/allCategoriesCache.js');
const { categoryListArray } = require('../api_calls/categoriesList');

const categories = {
  dresses: '63861',
  womansCoatsJackets: '63862',
  womensTshirts: '63869',
  topsAndBlouses: '53159',
}

let counter = 0

module.exports.throttleCB = () => {
  counter++
  module.exports.gettersHousing()
}

module.exports.gettersHousing = () => {
  if( counter < categoryListArray.length) {
    getAllEbayData(categoryListArray[counter].id, allCategoriesCache[categoryListArray[counter].name])
  }
};

module.exports.gettersHousing(counter)