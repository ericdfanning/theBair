const APP_ID = require('../server/ebay.config').APP_ID
const axios = require('axios');

async function getBrandNamesAsync(filtered){
	let idsUrl = `http://open.api.ebay.com/shopping?` +
	  `callname=GetMultipleItems&` +
	  `responseencoding=JSON&` +
	  `appid=${APP_ID}&` +
	  `siteid=0&` +
	  `version=967&` +
	  `IncludeSelector=ItemSpecifics&` +
	  `ItemID=`

  let items = []
  let ids = []
  // Since eBay only allows fetching 20 items at a time, async loop over all items 20 at a time
  for (let i = 0; i < filtered.length; i++) {
    if (ids.length === 20 || i === filtered.length - 1) {
      // console.log('every 20', i)
      items.push(await axios.get(idsUrl + ids.join(',')));
      ids = [];
      ids.push(filtered[i]);
    } else {
      ids.push(filtered[i]);
    }
    if (i === filtered.length - 1) {
    	console.log('finished for loop for api calls with IDs. i finished on', i)
    }
  }
  return items;
}

module.exports = getBrandNamesAsync