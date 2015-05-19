var sweetcaptcha = new require('sweetcaptcha')(237706, '5f0353a18950b6359d22ac6c2a7dabe5', '5dc5db861d4f3f7a3487e6e6a6219c82');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/UserModel');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
	passport.use('signup', new LocalStrategy({
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},

	function(req, username, password, done) {
	findOrCreateUser = function(){
		// find a user in Mongo with provided username
		validateCaptcha(req.param('sckey'),req.param('scvalue'),function(err,reponse) {
			if (err){
				console.log('Error in SignUp: '+err);
				return done(null, false, req.flash('message','Error in captcha, try again'));
			}
			if (!reponse){
				console.log('Error in captcha : ' + err);
				return done(null, false, req.flash('message','Error in captcha, try again'));
			}
			else {		
				
				User.findOne({ 'username' : username }, function(err, user) {
				// In case of any error, return using the done method
					if (err){
						console.log('Error in SignUp: '+err);
						return done(null, false, req.flash('message','Error : problem with database'));
					}
					// already exists
					if (user) {
						console.log('User already exists with username: '+username);
						return done(null, false, req.flash('message','login allready in use'));
					} else {
						User.findOne({ 'email' : req.param('email')}, function(err, user) {
							if (err){
								console.log('Error in SignUp: '+err);
								return done(null, false, req.flash('message','Error : problem with database'));
							}
							// already exists
							if (user) {
								console.log('User already exists with email : '+req.param('email'));
								return done(null, false, req.flash('message','email allready in use'));
							} else {
								// if there is no user with that email
								// create the user
								var newUser = new User();
								// set the user's local credentials
								newUser.username = username;
								newUser.password = createHash(password);
								newUser.email = req.param('email');
								// save the user
								newUser.save(function(err) {
									if (err){
										console.log('Error in Saving user: '+err);
										return done(null, false, req.flash('message','Error with user create'));
									}
								console.log('User Registration succesful');
								return done(null, newUser);
								});
							}
						});
					}
				});
			}
		});			
	};	
	// Delay the execution of findOrCreateUser and execute the method
	// in the next tick of the event loop
	process.nextTick(findOrCreateUser);
	})
	);
// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
	
	var validateCaptcha = function(captchaKey, captchaValue, callback) {

		// callback = function(err, isValid) {...}
		sweetcaptcha.api('check', {sckey: captchaKey, scvalue: captchaValue}, function(err, reponse){
			if (err) {
				Console.log(err);
				return callback(err,false);
			}

			if (reponse === 'true') {
			// valid captcha
			return callback(null, true); 
			}

			// invalid captcha
			callback(null, false);
		});  
	}
}