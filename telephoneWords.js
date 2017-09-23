function telephoneWords (ds, final = [], temp = []) {
	ds = ds.split('')
  var letters = {
    "1": "1",
    "2": ['A', 'B', 'C'],
    "3": ['D', 'E', 'F'],
    "4": ['G', 'H', 'I'],
    "5": ['J', 'K', 'L'],
    "6": ['M', 'N', 'O'],
    "7": ['P', 'Q', 'R', 'S'],
    "8": ['T', 'U', 'V'],
    "9": ['W', 'X', 'Y', 'Z'],
    "0": "0"
  }

  if (typeof letters[ds[0]] === 'string') {
  	temp = [ds[0], ds[0], ds[0]]
  } else {
  	temp = letters[ds[0]]
  	temp.push()
  }

  for (let i = 1; i < ds.length; i++) {
  	var temp2 = [] 
  	var num = ds[i]
  	
    if (Array.isArray(letters[num])) {
    	for (let h = 0; h < temp.length; h++) {
	      for (let j = 0; j < letters[num].length; j++) {
	        temp2.push(temp[h] + letters[num][j])
	      }
    	}
    } else {
      temp2.push(temp[0] + letters[num])   
    }
    temp = temp2.slice()
  }
  
  temp2.forEach(v => {
  	if (!final.includes(v)) {
    	final.push(v)
    }
  })

  return final.sort()
}
console.log(telephoneWords("1234")) //[ "11AD", "11AE", "11AF", "11BD", "11BE", "11BF", "11CD", "11CE", "11CF" ]
// console.log(telephoneWords("0002")) //[ "000A", "000B", "000C" ]