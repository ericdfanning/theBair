const allCategoriesCache = require('../cache/allCategoriesCache.js');
const { Current } = require('../schema');
const { createCurrentCategoryQuery } = require('../api_calls/helpers/mongoHelpers');

const categories = {
  dresses: '63861',
  womansCoatsJackets: '63862',
  womensTshirts: '63869',
  topsAndBlouses: '53159',
  // flats: '45333',
  // heels: '55793',
  // womansSandals: '62107',
  // womensSweaters: '63866',
  // womensJeans: '11554',
  // mensJeans: '11483',
  // mensSweaters: '11484',
  // mensDressShirts: '57991',
  // mensCasualShirts: '57990',
  // mensTshirts: '15687',
  // mensBlazors: '3002',
  // ties: '15662',
  // mensDressFormalShoes: '53120',
  // mensCasualShoes: '24087'
}

for (let key in categories) {

	let promise = createCurrentCategoryQuery(categories[key])

  promise.then( (current) => {
    console.log('RESPONSE FROM MONGO', current[current.length - 1].info)
    allCategoriesCache[key].brands = current[current.length - 1].info.brands
    allCategoriesCache[key].brandsCount = current[current.length - 1].info.brandsCount
  })
  .catch( err => {
  	console.log(`!!!!! Something went wrong retrieving ${key} for initial setting of cache`)
  })

}