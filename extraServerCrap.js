 
  //         var detailsOptions = {
  //           host: 'open.api.ebay.com',
  //           path: `/shopping?` +
  //           `callname=GetMultipleItems&` +
  //           `responseencoding=XML&` +
  //           `appid=${APP_ID}&` +
  //           `siteid=0&` +
  //           `version=967&` +
  //           `IncludeSelector=ItemSpecifics&` +
  //           `ItemID=${ids[0]},${ids[1]},${ids[2]},${ids[3]},${ids[4]},` +
  //           `${ids[5]},${ids[6]},${ids[7]},${ids[8]},${ids[9]},${ids[10]},${ids[11]},` +
  //           `${ids[12]},${ids[13]},${ids[14]},${ids[15]},${ids[16]},${ids[17]},${ids[18]},${ids[19]},`
  //         };

  //         var req = http.get(detailsOptions, function(res) {

  //           // Buffer the body entirely for processing as a whole.
  //           var bodyChunks = [];
  //           res.on('data', function(chunk) {
  //             // You can process streamed parts here...
  //             bodyChunks.push(chunk);
  //           }).on('end', function() {
  //             var body = Buffer.concat(bodyChunks);

  //             parseString(body, function (err, result1) {
  //               // console.log(result.GetMultipleItemsResponse.Item[0].ItemSpecifics[0].NameValueList[0])
  //               var brands = [];
  //               result1.GetMultipleItemsResponse.Item.forEach(obj => {
  //                 brands.push(obj.ItemSpecifics[0].NameValueList[0].Value[0])
  //               })
  //               console.log(brands)
  //             });
  //           })
  //         })

  //        //  //Get end dates
  //        //  // var endDates = [];
  //        //  var endDates = result.findCompletedItemsResponse.searchResult[0].item.map(obj => {
  //        //    var date = new Date(obj.listingInfo[0].endTime[0])
  //        //    return date.toLocaleDateString()
  //        //  })


  //        //  // Get brand names
  //        //  var brandNames = result.findCompletedItemsResponse.aspectHistogramContainer[0].aspect[2].valueHistogram.map(obj => {
  //        //    return obj.$.valueName
  //        //  })












  // var req = http.get(soldOptions, function(res) {
  //   // console.log('STATUS: ' + res.statusCode);
  //   // console.log('HEADERS: ' + JSON.stringify(res.headers));

  //   // Buffer the body entirely for processing as a whole.
  //   var bodyChunks = [];
  //   res.on('data', function(chunk) {
  //     // You can process streamed parts here...
  //     bodyChunks.push(chunk);
  //   }).on('end', function() {
  //     var body = Buffer.concat(bodyChunks);
  //     // console.log('BODY: ' + body)

  //     parseString(body, function (err, result) {
  //         console.dir(result);
  //         // console.log(result.findCompletedItemsResponse.paginationOutput)
  //         // // Get titlesf
  //         var ids = [];
  //         result.findCompletedItemsResponse.searchResult[0].item.forEach(obj => {
  //           if (obj.sellingStatus[0].sellingState[0] === 'EndedWithSales') {
  //             ids.push(obj.itemId[0])
  //           }
  //         })


  //         var detailsOptions = {
  //           host: 'open.api.ebay.com',
  //           path: `/shopping?` +
  //           `callname=GetMultipleItems&` +
  //           `responseencoding=XML&` +
  //           `appid=${APP_ID}&` +
  //           `siteid=0&` +
  //           `version=967&` +
  //           `IncludeSelector=ItemSpecifics&` +
  //           `ItemID=${ids[0]},${ids[1]},${ids[2]},${ids[3]},${ids[4]},` +
  //           `${ids[5]},${ids[6]},${ids[7]},${ids[8]},${ids[9]},${ids[10]},${ids[11]},` +
  //           `${ids[12]},${ids[13]},${ids[14]},${ids[15]},${ids[16]},${ids[17]},${ids[18]},${ids[19]},`
  //         };

  //         var req = http.get(detailsOptions, function(res) {

  //           // Buffer the body entirely for processing as a whole.
  //           var bodyChunks = [];
  //           res.on('data', function(chunk) {
  //             // You can process streamed parts here...
  //             bodyChunks.push(chunk);
  //           }).on('end', function() {
  //             var body = Buffer.concat(bodyChunks);

  //             parseString(body, function (err, result1) {
  //               // console.log(result.GetMultipleItemsResponse.Item[0].ItemSpecifics[0].NameValueList[0])
  //               var brands = [];
  //               result1.GetMultipleItemsResponse.Item.forEach(obj => {
  //                 brands.push(obj.ItemSpecifics[0].NameValueList[0].Value[0])
  //               })
  //               console.log(brands)
  //             });
  //           })
  //         })

  //        //  //Get end dates
  //        //  // var endDates = [];
  //        //  var endDates = result.findCompletedItemsResponse.searchResult[0].item.map(obj => {
  //        //    var date = new Date(obj.listingInfo[0].endTime[0])
  //        //    return date.toLocaleDateString()
  //        //  })


  //        //  // Get brand names
  //        //  var brandNames = result.findCompletedItemsResponse.aspectHistogramContainer[0].aspect[2].valueHistogram.map(obj => {
  //        //    return obj.$.valueName
  //        //  })

  //        //  // for (var i = 0; i < brandNames.length; i++) {

  //        //  // }

  //        //  result.findCompletedItemsResponse.aspectHistogramContainer[0].aspect[2].valueHistogram[8]
  //         //console.log(endDates.length, brandNames.length)
  //         //console.log(items.length, date.toLocaleDateString())
  //         // var options2 = {
  //         //   host: 'open.api.ebay.com',
  //         //   path: `/shopping?callname=GetMultipleItems&responseencoding=XML&appid=${APP_ID}&siteid=0&version=967&ItemID=${items[0]},${items[1]},${items[2]}`
  //         // }


  //     response.status(200)
  //     response.send()
  //     });
  //     // ...and/or process the entire body here.

  //  //    http://svcs.ebay.com/services/search/FindingService/v1?
  //  // OPERATION-NAME=findItemsAdvanced&
  //  // SERVICE-VERSION=1.0.0&
  //  // SECURITY-APPNAME=YourAppID&
  //  // RESPONSE-DATA-FORMAT=XML&
  //  // REST-PAYLOAD=true&
  //  // paginationInput.entriesPerPage=2&
  //  // keywords=tolkien


  //   })

  // });
