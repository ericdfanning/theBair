var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = Promise

const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose.connect('mongodb://localhost/profitPal', options);

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

// leaders schema will be made up of top 10 of the Queried sorted array 
  // per category 