var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
	
var userSchema = new Schema({	
	username : { type: String, required: true, unique: true },
	email    : { type: String, required: true, unique: true },
	password : { type: String, required: true  },
	resetPasswordToken: String,
	resetPasswordExpires: Date	
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);
