
var unique = (array, newBatch) => {
	var arr = []
	console.log('newBatch', array.length)
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
	console.log('filtered in helper and arr length', filtered.length, arr.length)
	return filtered
}

function combineAvgs(current, old) {
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

function combineAll(current, old) {
	if (!old[0]) {
		return current;
	} else {
	// console.log('AFTER SAVING FROM THE DATABASE****************************************************', old[0].brands)
		var newObj = Object.assign({}, old[0].brands)
	  for (var i = 1; i < old.length; i++) {
	    for (var key in old[i].brands) {
	  	  if (newObj[key]) {
	  	  	// console.log('aleardy exists', newObj[key].val, old[i].brands[key].val)
	  	  	newObj[key].val += old[i].brands[key].val;
	  	  	// console.log('ADDED TOGETHER', newObj[key].val)
	  	  	newObj[key].price.push(old[i].brands[key].price[0], old[i].brands[key].price[1])
	  	  	var arr = newObj[key].price.slice()
	  	  	arr.sort(function (a, b) {
	    			return a - b;
	  			})
	  			arr = arr.filter(v => v !== 0)
	  			newObj[key].price = []
	  			if (arr.length === 1) {
	  				arr.unshift(0)
	  			}
	  			newObj[key].price.push(arr[0], arr[arr.length - 1])
	  			if (newObj[key].name === 'LULAROE') {
	  			  console.log('AVERAGES OF BOTH', newObj[key].name, newObj[key].val, newObj[key].avgs, '^^^^', old[i].brands[key].avgs)
	  			}
	  			combineAvgs(newObj[key].avgs, old[i].brands[key].avgs)
	  			// newObj[key].avg = Object.assign({}, combineAvgs(newObj[key].avgs, old[i].brands[key].avgs))
	  	  } else {
	  	  	newObj[key] = old[i].brands[key];
	  	  }
	    }
	  }
    return newObj
	}
}

var createBrandsObj = (result, old) => {
	// add new item values to current property keys
	// iterate through 'current' array and check prop keys
	// against first element in 'current' array, building
	// on big array. Then make that the local one
	var brands = {};
	var joined = {};
	result.forEach(v => {
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
	            } else {
	            	brands[temp].avgs[max1] = 1
	            }
	          } else {
	          	if (temp !== 'UNBRANDED' && temp !== 'UNKNOWN') {
		            brands[temp] = {
		              name: n.Value[0].toUpperCase(),
		              val: 1, endTime, price: [0, price], avgs: {}
		            };
		            //check and set average price ranges in $5 increments
		            var max2 = 0
		            for (var i = 0; i <= price; i+=5, max2 = i) {}
		            if (brands[temp].avgs[max2]) {
		            	brands[temp].avgs[max2] += 1
		            } else {
		            	brands[temp].avgs[max2] = 1
		            }
	            }
	          }
	        } 
	      }
	    }
	  }
	})
	// console.log('AFTER CREATION BEFORE SAVING****************************************************', brands)
	var obj = {
		joined: combineAll(brands, old),
		current: brands
	}
	return obj;
}

var sortObj = (brands) => {
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

module.exports.createBrandsObj = createBrandsObj;
module.exports.unique = unique;
module.exports.sortObj = sortObj;



