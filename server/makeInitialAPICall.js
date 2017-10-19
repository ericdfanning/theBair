var getAllEbayData = require('../api_calls/getAllEbayData.js');
var allCategoriesCache = require('../cache/allCategoriesCache.js');

var categories = {
  dresses: '63861',
  tshirts: '63869',
  topsAndBlouses: '53159',
  flats: '45333',
  sweaters: '63866',
  jeans: '11554'
}

getAllEbayData(categories.dresses, allCategoriesCache.dresses)
getAllEbayData(categories.tshirts, allCategoriesCache.tshirts)
getAllEbayData(categories.topsAndBlouses, allCategoriesCache.topsAndBlouses)
getAllEbayData(categories.flats, allCategoriesCache.flats)
getAllEbayData(categories.sweaters, allCategoriesCache.sweaters)
getAllEbayData(categories.jeans, allCategoriesCache.jeans)