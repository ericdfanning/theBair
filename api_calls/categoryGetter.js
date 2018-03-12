const { APP_ID } = require('../server/ebay.config');
const axios = require('axios');

async function getSoldListingsAsync(categoryCode) {
	let iterationString = '';
	let url = `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&` +
	  `SERVICE-VERSION=1.13.0&SECURITY-APPNAME=${APP_ID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&` + 
	  `categoryId=${categoryCode}&` +
	  `outputSelector=SellingStatus&` + 
	  `outputSelector=AspectHistogram&` + 
	  `paginationInput.entriesPerPage=100&` + 
	  `itemFilter(0).name=Condition&itemFilter(0).value=3000&` +
	  `itemFilter(1).name=SoldItemsOnly&itemFilter(1).value=true&` +
	  `paginationInput.pageNumber=` 

    // The await keyword saves us from having to write a .then() block.
    let data = []
    for (let i = 2; i > 0; i--) {
	    if (i%2 === 0) {
	      iterationString += ' ' + i
	    }
	    if (i%20 === 0) {
	      console.log(iterationString, 'category ----- ', categoryCode)
	    }
	    if (i === 1) {
	    	try {
	    		const { throttleCB } = require('../server/makeInitialAPICall.js');
	    		throttleCB()
	    	} catch (err) {
	    		console.log('error in throttle call back')
	    	}
	    }
      data.push(await axios.get(url + i));
    }

    return data;
}

module.exports = getSoldListingsAsync

// async function getSoldListingsAsync(){
//     // The await keyword saves us from having to write a .then() block.
//     let data = []
//     for (let i = 2; i > 0; i--) {
//       console.log('@@@@@@@@@@@', i, 'category ----- ', categoryCode)
//       data.push(await axios.get(url + i));
//     }

//     return data;
// }