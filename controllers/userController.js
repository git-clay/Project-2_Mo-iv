var passport = require("passport");
var db = require('../models');
var express = require('express');
var app = express();
	bodyParser		= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var unirest = require('unirest');
var count=1;
var resultObj=[]; 


var sentApi = function(element,i,callback){ //sentiment api analysis 

	unirest.post("https://twinword-sentiment-analysis.p.mashape.com/analyze/")
	.header("X-Mashape-Key", "EiFKUp9ROymshrUthQlrkwSWWM7lp1OsBRCjsno44Cct6gKP8V")
	.header("Content-Type", "application/x-www-form-urlencoded")
	.header("Accept", "application/json")
	.send("text="+element)
	.end(function (result) {
	// res.json("total score: "+result.body.score)
	
return callback(result,i,element)
});

		// console.log('done');
};




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
function postLogin(req, res,next) {
		var loginStrategy = passport.authenticate('local-login', {
		successRedirect	: '/',
		failureRedirect	: '/login',
		failureFlash	: true
	});
		// console.log(loginStrategy(req,res));
	return loginStrategy(req,res,next);
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
	console.log(req.body);



var ele = [req.body.q1,req.body.q2,req.body.q3,req.body.q4];
for(var i = 0; i<ele.length;i++){

	sentApi(ele[i],i,function(result,i,element){
		var curObj = result.body;
		console.log(i,element)
		resultObj.push({q:i,type:curObj.type,score:curObj.score,key:curObj.keywords});
			
			
if(count==ele.length){
	//save resultObj to user
console.log(resultObj);
// console.log(resultObj[0].key);
console.log(resultObj[1].key[0]);
console.log(resultObj[1].q);

res.locals.currentUser.qOne.push(resultObj)
res.locals.currentUser.save(function(err,stuff){

	console.log("new user: "+res.locals.currentUser);
});


}
		count++;
		});
	// console.log(i);
	


}
}


// These code snippets use an open-source library. http://unirest.io/nodejs

//put
/*app.put('/api/project/:id', function (req, res){
console.log('get project');
var projId = req.params.id;
  db.Project.findOne({id: projId}, function(err,project){
      if (err){return console.log('error:',err);}
        if(req.body.id) project.id = req.body.id;
        if(req.body.name) project.name = req.body.name;
        if(req.body.platform) project.platform = req.body.platform;
        if(req.body.purpose) project.purpose = req.body.purpose;
        if(req.body.skills) project.skills = req.body.skills;
        if(req.body.items_needed) project.items_needed = req.body.items_needed;
        if(req.body.source) project.source = req.body.source;
        if(req.body.complete) project.complete = req.body.complete;
    project.save(function(err,proj){
        if(err){return console.log('error:",err');}
         res.json(project.name+' updated');
    });
  });
});*/


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