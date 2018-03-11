const categoriesPretty = {
	'63861': 'Dresses',
	'63869': 'T-Shirts',
	'53159': 'Tops & Blouses',
	'45333': 'Flats',
	'63866': 'Sweaters',
	'11554': 'Jeans',
	'63862': 'Womans Coats',
	'55793': 'Heels',
	'62107': 'Womans Sandals',
	'11483': 'Mens Jeans',
	'11484': 'Mens Sweaters',
	'57991': 'Mens Dress Shirts',
	'57990': 'Mens Casual Shirts',
	'15687': 'Mens T-Shirts',
	'3002': 'Mens Blazors',
	'15662': 'Ties',
	'53120': 'Mens Dress & Formal Shoes',
	'24087': 'Mens Casual Shoes'
}

const categories = {
  dresses: '63861',
  // womansCoatsJackets: '63862',
  // womensTshirts: '63869',
  // topsAndBlouses: '53159',
//   flats: '45333',
//   heels: '55793',
//   womansSandals: '62107',
//   womensSweaters: '63866',
//   womensJeans: '11554',
//   mensJeans: '11483',
//   mensSweaters: '11484',
//   mensDressShirts: '57991',
//   mensCasualShirts: '57990',
//   mensTshirts: '15687',
//   mensBlazors: '3002',
//   ties: '15662',
//   mensDressFormalShoes: '53120',
//   mensCasualShoes: '24087'
}

const catNums = []

for (let key in categories) {
	catNums.push({id: categories[key], name: key})
}

module.exports.categoryListArray = catNums;
module.exports.categoryListObj = categoriesPretty;