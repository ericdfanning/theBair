var router = require('express').Router();
var allCategoriesCache = require('../cache/allCategoriesCache.js');
var gettersHousing = require('../server.js');
var path = require('path');

router.get('/getStuff', function(req, res) {
	console.log('get stuff WAS CALLED', gettersHousing)
  gettersHousing.gettersHousing()
  res.status(200)
  res.end()
})

router.get('/dresses', function(req, res) {
  console.log('inside dresses')
  var dataObj = {
    data: allCategoriesCache.dresses.brands,
    pageCount: allCategoriesCache.dresses.brands.length,
    brandsCount: allCategoriesCache.dresses.brandsCount
  }
  res.status(200)
  res.send(dataObj)
})

router.get('/tshirts', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.tshirts.brands,
      pageCount: allCategoriesCache.tshirts.brands.length,
      brandsCount: allCategoriesCache.tshirts.brandsCount
  }
  console.log('inside tshirts',allCategoriesCache.tshirts.brands.length )
  res.status(200)
  res.send(dataObj)
})

router.get('/topsAndBlouses', function(req, res) {
  var dataObj = {
      data: allCategoriesCache.topsAndBlouses.brands,
      pageCount: allCategoriesCache.topsAndBlouses.brands.length,
      brandsCount: allCategoriesCache.topsAndBlouses.brandsCount
  }
  console.log('inside topsAndBlouses', allCategoriesCache.topsAndBlouses.brands.length)
  res.status(200)
  res.send(dataObj)
})

let emailService = require('./emailService/emailService.js')

router.get('/emailService', (req, res) => {
  console.log('email service')
  emailService.sendEmail()
})

router.get('/grizzly', function(req, res) {
  res.sendFile(path.join(__dirname, './images/grizzly-bear-roaring.png'))
})

router.get('/dresses', function(req, res) {
  res.sendFile(path.join(__dirname, './images/dresses.jpeg'))
})

router.get('/tshirts', function(req, res) {
  res.sendFile(path.join(__dirname, './images/tshirts.jpeg'))
})

router.get('/topsAndBlouses', function(req, res) {
  res.sendFile(path.join(__dirname, './images/topsAndBlouses.jpeg'))
})



router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

module.exports = router