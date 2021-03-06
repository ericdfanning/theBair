const _ = require('underscore-node');
const { searchAllObj, searchAllArr } = require('../../cache/allCategoriesCache');
const { categoriesPretty } = require('../categoriesList');

const addToSearchObj = (categoryCode, sortedBrands) => {
	// sortedBrands is an array of objects. Each object is a unique brand name
  var count = 0
  for (let brandObj of sortedBrands) {
  	// if (!searchAllObj[brandObj.name]) {
  	// 	searchAllArr.push(brandObj.name)
  	// }
  	const categoryName = categoriesPretty[categoryCode]
  	if (searchAllObj[brandObj.name]) {
  		searchAllObj[brandObj.name][categoryName] = brandObj
  	} else {
  		searchAllObj[brandObj.name] = {}
  		searchAllObj[brandObj.name][categoryName] = brandObj
  	}
  }
}

const unique = (array, newBatch) => {
	var arr = []
	// console.log('newBatch', array.length)
	for (let i = 0; i < array.length; i++) {
		arr = arr.concat(array[i].ids)
	}

	var filtered = []
	// console.log('array length', arr.length)
	for (let i = 0; i < newBatch.length; i++) {
		if (!arr.includes(newBatch[i])) {
			filtered.push(newBatch[i])
		}
	}
	// console.log('filtered in helper and arr length', filtered.length, arr.length)
	return filtered
}

const combineAvgs = (current, old) => {
	if (!old) {
		return current
	} else {
		for (var key in old) {
			if (current[key] && current[key] >=0) {
				current[key] += old[key]
			} else {
				// console.log('DOESNT EXIST', key, old[key])
				current[key] = old[key]
			}
		}
	}
	// console.log('AFTER AVERAGES FINISHES $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', current)

}

const combineAll = (old) => {
	if (!old[0]) {
	console.log('cant combine all ###########################################')
		old = [[{brands: {}}]];
	}
	// console.log('AFTER SAVING FROM THE DATABASE****************************************************', old[0].brands)
		var newObj = Object.assign({}, old[0].brands)
		// console.log('new object @@@@@@@@@', newObj)
	  for (var i = 1; i < old.length; i++) {
	    for (var key in old[i].brands) {
	  	  if (newObj[key]) {
	  	  	// console.log('aleardy exists', newObj[key].val, old[i].brands[key].val)
	  	  	newObj[key].val += old[i].brands[key].val;
	  	  	// console.log('ADDED TOGETHER', newObj[key], key, i)
	  	  	newObj[key].price.push(old[i].brands[key].price[0], old[i].brands[key].price[1])
	  	  	var arr = newObj[key].price.slice()
	  	  	arr.sort(function (a, b) {
	    			return a - b;
	  			})
	  			if (arr.length === 1) {
	  				arr.unshift(0)
	  			} else {
	  				arr = arr.filter(v => v !== 0)
	  			}
	  			newObj[key].price = []
	  			newObj[key].price.push(arr[0], arr[arr.length - 1])
	  			// if (newObj[key].name === 'LULAROE') {
	  			//   // console.log('AVERAGES OF BOTH', newObj[key].name, newObj[key].val, newObj[key].avgs, '^^^^', old[i].brands[key].avgs)
	  			// }
	  			if (old[i].brands[key].pics && !newObj[key].pics) {
	  				newObj[key].pics = {...old[i].brands[key].pics}
	  			} else if (old[i].brands[key].pics && newObj[key].pics) {
	  				newObj[key].pics = {...newObj[key].pics, ...old[i].brands[key].pics}
	  			}
	  			combineAvgs(newObj[key].avgs, old[i].brands[key].avgs)
	  			// newObj[key].avg = Object.assign({}, combineAvgs(newObj[key].avgs, old[i].brands[key].avgs))
	  	  } else {
	  	  	newObj[key] = old[i].brands[key];
	  	  }
	    }
	  }
	  // console.log('THE NEW OBJECT THAT WAS COMBINED ___________', newObj)
    return newObj
}

const createBrandsObj = (result) => {
	// add new item values to current property keys
	// iterate through 'current' array and check prop keys
	// against first element in 'current' array, building
	// on big array. Then make that the local one
	var brands = {};
	// console.log('result.length in createBrandsObj', result.length)
	result.forEach(v => {
		// console.log('$$$$$$ THE OLD ARRAY OF OBJECTS $$$$$$$$$$$$ ', old)
		console.log('$$$$$$$$$$$$$$$$  INSIDE THE HELPER ', v.data.Ack)
		if (v.data.Ack !== 'Failure') {
		  for (let obj of v.data.Item) {
		    if (obj.ItemSpecifics) {
		      let date = new Date(obj.EndTime)
		      date = date.toDateString().split('')
		      date.splice(-4, 4)
		      let endTime = date.join('')
		      let price = obj.ConvertedCurrentPrice.Value
		      for (let n of obj.ItemSpecifics.NameValueList) {
		        if (n.Name === 'Brand') {
		          var temp = n.Value[0].toUpperCase().split(' ')
		            .join('').split("\'").join('').split('.').join('')
		          if (brands[temp]) {
		            brands[temp].val += 1;
		            if (price > brands[temp].price[1]) {
		            	var holder = brands[temp].price[1]
		              brands[temp].price[1] = price
		              brands[temp].price[0] = holder
		            } else if (price < brands[temp].price[1] && price > brands[temp].price[0]) {
		              brands[temp].price[0] = price
		            }

		            //check and set average price ranges in $5 increments
		            var max1 = 0
		            for (var i = 0; i <= price; i+=5, max1 = i) {}
		            if (brands[temp].avgs[max1]) {
		            	brands[temp].avgs[max1] += 1
		            	if (brands[temp].pics && brands[temp].pics[max1].length < 50) {
		            	  brands[temp].pics[max1].push(obj.GalleryURL)
		            	}
		            } else {
		            	brands[temp].avgs[max1] = 1
		            	brands[temp].pics[max1] = []
		            	brands[temp].pics[max1].push(obj.GalleryURL)
		            }
		          } else {
		          	if (temp !== 'UNBRANDED' && temp !== 'UNKNOWN') {
			            brands[temp] = {
			              name: n.Value[0].toUpperCase(),
			              val: 1, endTime, price: [0, price], avgs: {}, pics: {}
			            };
			            //check and set average price ranges in $5 increments
			            var max2 = 0
			            for (var i = 0; i <= price; i+=5, max2 = i) {}
			            if (brands[temp].avgs[max2]) {
			            	brands[temp].avgs[max2] += 1
			            	if (brands[temp].pics && brands[temp].pics[max2].length < 50) {
			            	  brands[temp].pics[max2].push(obj.GalleryURL)
			            	}
			            } else {
			            	brands[temp].avgs[max2] = 1
			            	brands[temp].pics[max2] = []
			            	brands[temp].pics[max2].push(obj.GalleryURL)
			            }
		            }
		          }
		        } 
		      }
		    }
		  }
	  } else {
	  	console.log('item was SKIPPED', v.data.Ack)
	  }
	})
	// console.log('AFTER CREATION BEFORE SAVING***************************************', Object.keys(brands).length)
	console.log('FINISHED CREATE BRANDS OBJECT IN TRANSFORMATION')
	return brands;
}

const sortObj = (brands) => {
  // put each brands summary into an array
  var sortedBrands = []
  for (let key in brands) {
    sortedBrands.push(brands[key])
  } 

  // sortedBrands.sort(function (a, b) {
  //   var nameA = a.name;
  //   var nameB = b.name;
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   // names must be equal
  //   return 0;

  // });

  sortedBrands.sort(function (a, b) {
    return b.val - a.val;
  });
  return sortedBrands
}

const getOnlyEndedWithSalesIDS = (result) => { // gets listing ids 
	let ids = []
	result.forEach(v => {
	  for (let obj of v.data.findCompletedItemsResponse[0].searchResult[0].item) {
	    if (obj.sellingStatus[0].sellingState[0] === 'EndedWithSales') {
	      ids.push(obj.itemId[0])
	    } 
	  }
	})
	let finalIdList = _.uniq(ids)
	return finalIdList
}

module.exports.createBrandsObj = createBrandsObj;
module.exports.combineAll = combineAll;
module.exports.unique = unique;
module.exports.sortObj = sortObj;
module.exports.getOnlyEndedWithSalesIDS = getOnlyEndedWithSalesIDS;
module.exports.addToSearchObj = addToSearchObj;


