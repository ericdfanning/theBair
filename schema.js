var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/profitPal');

var currentSchema = new Schema({
  category: String,
  info: Array, 
  created: Date

});
var Current = mongoose.model('current', currentSchema);

var categorySchema = new Schema({
	created: Date,
	category: String,
  brands: Object, 
});
var Category = mongoose.model('category', categorySchema);

// var brandsSchema = new Schema({
//   brand: Array, 
//   sorted: Array,
//   itemId: String
// });
// var Brands = mongoose.model('brands', brandsSchema);

var leadersSchema = new Schema({
  leaders: Array
});

var Leaders = mongoose.model('leaders', leadersSchema);

var itemIdsSchema = new Schema({
  created: Date,
  category: String,
  ids: Array
});

var ItemIds = mongoose.model('itemIds', itemIdsSchema);

module.exports.Leaders = Leaders;
module.exports.ItemIds = ItemIds;
module.exports.Category = Category;
module.exports.Current = Current;
// module.exports.Brands = Brands;

// leaders schema will be made up of top 10 of the Queried sorted array 
  // per category 