var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
	
var categorySchema = new Schema({	
	name : { type: String, required: true, unique: true },
	//facets : [String]
}, {collection: 'categories'});

// var facetSchema = new Schema({	
	// _id : { type: String, required: true, unique: true },
	// name : { type: String, required: true },
	// value : { type: String, required: true }
// }, {collection: 'facets'});

module.exports = mongoose.model('Category', categorySchema);
//module.exports = mongoose.model('Facet', facetSchema);