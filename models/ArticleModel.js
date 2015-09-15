var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate');
    Schema = mongoose.Schema;
	
var articleSchema = new Schema({	
	date : { type: Date, required: true, default: Date.now },
	author: { type: String },
	title : { type: String, required: true },
	body : { type: String },
	categories : [String],
	facets : [{ name: String }, { value: String }]
}, {collection: 'articles'});

articleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', articleSchema);