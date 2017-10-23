var getAllEbayData = require('../api_calls/getAllEbayData.js');
var allCategoriesCache = require('../cache/allCategoriesCache.js');

var categories = {
  dresses: '63861',
  womansCoatsJackets: '63862',
  womensTshirts: '63869',
  topsAndBlouses: '53159',
  flats: '45333',
  heels: '55793',
  womansSandals: '62107',
  womensSweaters: '63866',
  womensJeans: '11554',
  mensJeans: '11483',
  mensSweaters: '11484',
  mensDressShirts: '57991',
  mensCasualShirts: '57990',
  mensTshirts: '15687',
  mensBlazors: '3002',
  ties: '15662',
  mensDressFormalShoes: '53120',
  mensCasualShoes: '24087'
}

getAllEbayData(categories.dresses, allCategoriesCache.dresses)
getAllEbayData(categories.womensTshirts, allCategoriesCache.womensTshirts)
getAllEbayData(categories.topsAndBlouses, allCategoriesCache.topsAndBlouses)
getAllEbayData(categories.flats, allCategoriesCache.flats)
getAllEbayData(categories.womensSweaters, allCategoriesCache.womensSweaters)
getAllEbayData(categories.womensJeans, allCategoriesCache.womensJeans)
getAllEbayData(categories.womansCoatsJackets, allCategoriesCache.womansCoatsJackets)
getAllEbayData(categories.heels, allCategoriesCache.heels)
getAllEbayData(categories.womansSandals, allCategoriesCache.womansSandals)

getAllEbayData(categories.mensJeans, allCategoriesCache.mensJeans)
getAllEbayData(categories.mensSweaters, allCategoriesCache.mensSweaters)
getAllEbayData(categories.mensDressShirts, allCategoriesCache.mensDressShirts)
getAllEbayData(categories.mensCasualShirts, allCategoriesCache.mensCasualShirts)
getAllEbayData(categories.mensTshirts, allCategoriesCache.mensTshirts)
getAllEbayData(categories.mensBlazors, allCategoriesCache.mensBlazors)
getAllEbayData(categories.ties, allCategoriesCache.ties)
getAllEbayData(categories.mensDressFormalShoes, allCategoriesCache.mensDressFormalShoes)
getAllEbayData(categories.mensCasualShoes, allCategoriesCache.mensCasualShoes)