var passport = require("passport");
var db = require('../models');
var express = require('express');
var app = express();
	bodyParser		= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var unirest = require('unirest');
var status_code =200;
var delay=5000;


var sentApi = function(element,res,callback){ //sentiment api analysis 
// console.log("element: "+element);
// app.get('https://twinword-sentiment-analysis.p.mashape.com/analyze/',function(req,res){
// app.set("X-Mashape-Key", "EiFKUp9ROymshrUthQlrkwSWWM7lp1OsBRCjsno44Cct6gKP8V")
// app.set("Accept", "application/json")
// app.send("text="+element)

// 	console.log(req,res)
// console.log("resraw: "+res.raw_body);
	// console.log(res.raw_body.result_code);
// });

		unirest.post("https://twinword-sentiment-analysis.p.mashape.com/analyze/")
		.header("X-Mashape-Key", "EiFKUp9ROymshrUthQlrkwSWWM7lp1OsBRCjsno44Cct6gKP8V")
		.header("Content-Type", "application/x-www-form-urlencoded")
		.header("Accept", "application/json")
		.send("text="+element)
		.end(function (result) {

// console.log("resraw: "+result.raw_body);
	// console.log(res.raw_body.result_code);
	  // console.log(result.body.keywords,result.body.keywords[0].word,result.body.keywords[0].score)
// console.log(result)
// resRaw.type = positive,neutral or negative
// console.log("score: "+result.body.score,"keywords: "+result.body.keywords[[0]],"type: "+result.body.type)
//resraw.score = total average
//resraw.keywords = [{"word":"happy","score":0.941875182},{"word":"trust","score":0.714332352}]
	// console.log("user: "+res.locals.currentUser.goals);
	// res.json("total score: "+result.body.score)
	
return callback(result.body)
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
	console.log('post');
var resultObj=[];

var ele = [req.body.q1,req.body.q2,req.body.q3,req.body.q4];
for(var i = 0; i<ele.length;i++){

		sentApi(ele[i],res,function(result){
			console.log(result);

		});
	// console.log(i);
	


}
console.log('after for');

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