const getAllEbayData = require('../api_calls/getAllEbayData.js');
const allCategoriesCache = require('../cache/allCategoriesCache.js');

const categories = {
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

// fetch all categories on start of server/reboot of server
for (let key in categories) {
  getAllEbayData(categories[key], allCategoriesCache[key])
}

// function used by cron to fetch all categories once a day
const gettersHousing = () => {
  for (let key in categories) {
    getAllEbayData(categories[key], allCategoriesCache[key])
  }
}

module.exports = gettersHousing