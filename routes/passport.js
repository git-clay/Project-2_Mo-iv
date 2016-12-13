var LocalStrategy	= require('passport-local').Strategy,
	// User			= require('../models/user.js'),
	db				= require('../models');

module.exports		= function(passport) {  //export serialized user info for login
	passport.serializeUser(function(user,callback) {
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback){
		db.User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({ //register new
		usernameField: 'email',
		passwordField : 'password',
		passReqToCallback: true
	}, function (req,email,password,callback) {
		console.log(email,password,callback)
		db.User.findOne({'local.email': email}, function(err, user){

			if (err) return callback(err);
			if (user){ //this email is already used
				return callback(null, false, req.flash('signupMessage', 'This E-mail is already being used on mo+iv'));
			} else { //create new account
				var newUser = new db.User();
				newUser.local.email = email;
				newUser.local.password = newUser.encrypt(password);
				newUser.name = req.body.name;
				newUser.goals = req.body.goals;

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
	console.log(email)

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