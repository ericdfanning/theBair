const router = require('express').Router();
const allCategoriesCache = require('../cache/allCategoriesCache.js');
const gettersHousing = require('../server.js');
const path = require('path');
const { searchAllObj } = require('../cache/allCategoriesCache');

router.get('/search', function(req, res) {
  // let category = req.body.categoryCode;
  // let brandName = req.body.brandName;
  // let result = searchAllObj[brandName.toUpperCase()]
  res.status(200).send(searchAllObj)
})

router.get('/category/dresses', function(req, res) {

  var dataObj = {
    data: allCategoriesCache.dresses.brands,
    pageCount: allCategoriesCache.dresses.brands.length,
    brandsCount: allCategoriesCache.dresses.brandsCount
  }
  res.status(200)
  res.send(dataObj)
})

router.get('/category/tshirts', function(req, res) {
  console.log('in the route ', allCategoriesCache.womensTshirts.brands.length)
  var dataObj = {
      data: allCategoriesCache.womensTshirts.brands,
      pageCount: allCategoriesCache.womensTshirts.brands.length,
      brandsCount: allCategoriesCache.womensTshirts.brandsCount
  }
  console.log('inside womensTshirts',allCategoriesCache.womensTshirts.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/topsAndBlouses', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.topsAndBlouses.brands,
      pageCount: allCategoriesCache.topsAndBlouses.brands.length,
      brandsCount: allCategoriesCache.topsAndBlouses.brandsCount
  }
  console.log('inside topsAndBlouses', allCategoriesCache.topsAndBlouses.brands.length)
  res.status(200)
  res.send(dataObj)
})

router.get('/category/flats', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.flats.brands,
      pageCount: allCategoriesCache.flats.brands.length,
      brandsCount: allCategoriesCache.flats.brandsCount
  }
  console.log('inside flats',allCategoriesCache.flats.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/sweaters', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.womensSweaters.brands,
      pageCount: allCategoriesCache.womensSweaters.brands.length,
      brandsCount: allCategoriesCache.womensSweaters.brandsCount
  }
  console.log('inside womensSweaters',allCategoriesCache.womensSweaters.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/jeans', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.womensJeans.brands,
      pageCount: allCategoriesCache.womensJeans.brands.length,
      brandsCount: allCategoriesCache.womensJeans.brandsCount
  }
  console.log('inside womensJeans',allCategoriesCache.womensJeans.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/womansCoatsJackets', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.womansCoatsJackets.brands,
      pageCount: allCategoriesCache.womansCoatsJackets.brands.length,
      brandsCount: allCategoriesCache.womansCoatsJackets.brandsCount
  }
  console.log('inside womansCoatsJackets',allCategoriesCache.womansCoatsJackets.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/heels', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.heels.brands,
      pageCount: allCategoriesCache.heels.brands.length,
      brandsCount: allCategoriesCache.heels.brandsCount
  }
  console.log('inside heels',allCategoriesCache.heels.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/womansSandals', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.womansSandals.brands,
      pageCount: allCategoriesCache.womansSandals.brands.length,
      brandsCount: allCategoriesCache.womansSandals.brandsCount
  }
  console.log('inside womansSandals',allCategoriesCache.womansSandals.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/mensJeans', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.mensJeans.brands,
      pageCount: allCategoriesCache.mensJeans.brands.length,
      brandsCount: allCategoriesCache.mensJeans.brandsCount
  }
  console.log('inside mensJeans',allCategoriesCache.mensJeans.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/mensSweaters', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.mensSweaters.brands,
      pageCount: allCategoriesCache.mensSweaters.brands.length,
      brandsCount: allCategoriesCache.mensSweaters.brandsCount
  }
  console.log('inside mensSweaters',allCategoriesCache.mensSweaters.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/mensDressShirts', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.mensDressShirts.brands,
      pageCount: allCategoriesCache.mensDressShirts.brands.length,
      brandsCount: allCategoriesCache.mensDressShirts.brandsCount
  }
  console.log('inside mensDressShirts',allCategoriesCache.mensDressShirts.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/mensCasualShirts', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.mensCasualShirts.brands,
      pageCount: allCategoriesCache.mensCasualShirts.brands.length,
      brandsCount: allCategoriesCache.mensCasualShirts.brandsCount
  }
  console.log('inside mensCasualShirts',allCategoriesCache.mensCasualShirts.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/mensTshirts', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.mensTshirts.brands,
      pageCount: allCategoriesCache.mensTshirts.brands.length,
      brandsCount: allCategoriesCache.mensTshirts.brandsCount
  }
  console.log('inside mensTshirts',allCategoriesCache.mensTshirts.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/mensBlazors', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.mensBlazors.brands,
      pageCount: allCategoriesCache.mensBlazors.brands.length,
      brandsCount: allCategoriesCache.mensBlazors.brandsCount
  }
  console.log('inside mensBlazors',allCategoriesCache.mensBlazors.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/ties', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.ties.brands,
      pageCount: allCategoriesCache.ties.brands.length,
      brandsCount: allCategoriesCache.ties.brandsCount
  }
  console.log('inside ties',allCategoriesCache.ties.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/mensDressFormalShoes', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.mensDressFormalShoes.brands,
      pageCount: allCategoriesCache.mensDressFormalShoes.brands.length,
      brandsCount: allCategoriesCache.mensDressFormalShoes.brandsCount
  }
  console.log('inside mensDressFormalShoes',allCategoriesCache.mensDressFormalShoes.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/mensCasualShoes', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.mensCasualShoes.brands,
      pageCount: allCategoriesCache.mensCasualShoes.brands.length,
      brandsCount: allCategoriesCache.mensCasualShoes.brandsCount
  }
  console.log('inside mensCasualShoes',allCategoriesCache.mensCasualShoes.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

module.exports = router