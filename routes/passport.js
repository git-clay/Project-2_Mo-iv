var LocalStrategy	= require('passport-logal').Strategy,
	User			= require('../models/user.js');

module.exports		= function(passport) {  //export serialized user info for login
	passport.serializeUser(function(user,callback) {
		callback(null, user.id);
	});

	passport.deserializedUser(function(id, callback){
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({ //register new
		usernameField: 'email',
		passwordField : 'password',
		passReqToCallback: true
	}, function (req,email,password,callback) {
		User.findOne({'local.email': email}, function(err, user){
			if (err) return callback(err);
			if (user){ //this email is already used
				return callback(null, false, req.flash('signupMuessage', 'This E-mail is already being used on mo+iv'));
			} else { //create new account
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.encrypt(password);

				newUser.save(function(err){
					if (err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));

	passport.use('local-login', new LocalStrategy({ //login to existing
		usernameField: 'email',
		passwordField : 'password',
		passReqToCallback: true
	}, function (req,email,password,callback) {
		User.findOne({'local.email' : email}, function(err,user){
			if(err) {return callback(err);}
			if (!user) {
				return callback(null, false, req.flash('loginMessage', 'That email is not registered with mo+iv'));
			} if (!user.validPassword(password)) {
				return callback(null,false,req.flash('loginMessage', 'Oops! Wrong password'));
			} else {
				return callback(null,user);
				}
		});
	}));
};