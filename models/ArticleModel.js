var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
	
var articleSchema = new Schema({	
	date : { type: Date, required: true, default: Date.now },
	title : { type: String, required: true },
	body : { type: String }
}, {collection: 'articles'});

module.exports = mongoose.model('Article', articleSchema);


	