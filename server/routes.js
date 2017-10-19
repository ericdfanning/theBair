var router = require('express').Router();
var allCategoriesCache = require('../cache/allCategoriesCache.js');
var gettersHousing = require('../server.js');
var path = require('path');

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
  var dataObj = {
      data: allCategoriesCache.tshirts.brands,
      pageCount: allCategoriesCache.tshirts.brands.length,
      brandsCount: allCategoriesCache.tshirts.brandsCount
  }
  console.log('inside tshirts',allCategoriesCache.tshirts.brands.length )
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
      data: allCategoriesCache.sweaters.brands,
      pageCount: allCategoriesCache.sweaters.brands.length,
      brandsCount: allCategoriesCache.sweaters.brandsCount
  }
  console.log('inside sweaters',allCategoriesCache.sweaters.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/category/jeans', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.jeans.brands,
      pageCount: allCategoriesCache.jeans.brands.length,
      brandsCount: allCategoriesCache.jeans.brandsCount
  }
  console.log('inside jeans',allCategoriesCache.jeans.brands.length )
  res.status(200)
  res.send(dataObj)
})


router.get('/grizzly', function(req, res) {
  res.sendFile(path.join(__dirname, './images/grizzly-bear-roaring.png'))
})

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

module.exports = router