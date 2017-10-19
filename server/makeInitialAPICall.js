var getAllEbayData = require('../api_calls/getAllEbayData.js');
var allCategoriesCache = require('../cache/allCategoriesCache.js');

var categories = {
  dresses: '63861',
  tshirts: '63869',
  topsAndBlouses: '53159',
}

getAllEbayData(categories.dresses, allCategoriesCache.dresses)
getAllEbayData(categories.tshirts, allCategoriesCache.tshirts)
getAllEbayData(categories.topsAndBlouses, allCategoriesCache.topsAndBlouses)