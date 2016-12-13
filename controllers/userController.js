var passport = require("passport");
var db = require('../models');

/*********************** GET REGISTER (ejs page) ******************************/
function getRegister(req, res) {
	res.render('register.ejs' /*{message: request.flash('signupMessage')}*/);
}

/*********************** POST REGISTER ******************************/
function postRegister(req, res) {
	console.log('post register!');
	var registerStrategy = passport.authenticate('local-signup', {
		successRedirect	: '/',
		failureRedirect	: '/register',
		failureFlash	: true
	});
	return registerStrategy(req,res);
}
function getUsers(req,res){
	console.log('get users');
	db.User.find().exec(function(err,doc){
		res.json(doc);
	});
}

/*********************** GET LOGIN ******************************/
function getLogin(req, res) { 
	res.render('login.ejs', { message: req.flash('loginMessage') });
}

/*********************** POST LOGIN ******************************/
function postLogin(req, res) {
		var loginStrategy = passport.authenticate('local-login', {
		successRedirect	: '/',
		failureRedirect	: '/login',
		failureFlash	: true
	});
	return loginStrategy(req,res);
}

/*********************** GET LOGOUT ******************************/
function getLogout(req, res) {
	req.logout();
 	res.redirect('/');
}

/*********************** GET QUESTIONAIRE ******************************/
function getQuestionaire(req,res) {
	res.render('questionaire.ejs');
}

/*********************** POST QUESTIONAIRE ******************************/
function postQuestionaire(req,res) {

}


/*********************** DELETE ******************************/

module.exports = {
	getRegister: getRegister,
	postRegister: postRegister,
	getLogin: getLogin,
	getUsers:getUsers,
	postLogin: postLogin,
	getQuestionaire:getQuestionaire,
	postQuestionaire:postQuestionaire,
	getLogout: getLogout
};