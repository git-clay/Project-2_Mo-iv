/****************** require express, bodyParser, and ./models**************************/
var express 	= require('express'),
	app 		= express(),	
	mongoose    = require('mongoose'),
	passport     = require('passport'),
	flash        = require('connect-flash'),
	morgan       = require('morgan'),
	cookieParser = require('cookie-parser'),
	session      = require('express-session'),
	bodyParser	= require('body-parser'),
	schedule	= require('node-schedule'),
	// Papa	= require('papaparse')
	httpRequest = require('request'),
	Baby	= require('babyparse');
	require('dotenv').config();

	app.use(morgan('dev'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());


/*********************** DATABASE ******************************/

var db = require('./models');
app.use(express.static('public'));
// console.log(process.env)


/*********************** VIEWS ******************************/
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

/*********************** PASSPORT ******************************/
app.use(session({ secret: 'Stuff' })); 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./routes/passport.js')(passport);
app.use(function(req,res,next){
	// console.log(res,req.user);

	res.locals.currentUser = req.user;
	next();
});
/*********************** ROUTES ******************************/
var routes = require('./routes/routes.js');
app.use(routes);


/*********************** Daily api call  ******************************/


var date 	= new Date(),
	dd 		= date.getDate()-1,
	mm 		= date.getMonth()+1,
	yyyy	= date.getFullYear(),
	rule	= new schedule.RecurrenceRule(),
	url		= 'http://hedonometer.org/data/shifts/world/',
	shift 	= '-shift.csv',
	metashift = '-metashift.csv';

rule.dayOfWeek =[0, new schedule.Range(0,7)];
rule.hour = 0;
//used to schedule the api call
var apiCall = schedule.scheduleJob(rule,function(){ 
	console.log('ran', date)
	getHedoData();
});
// console.log('date:',date,'rule:',rule,'schedule',schedule)

if(dd<10) {dd='0'+dd;} 
if(mm<10) {mm='0'+mm;} 
date =	yyyy+'-'+ mm +'-'+dd;

var getShift = url+date+shift,
	getMetashift = url+date+metashift,
	storeObj={};

function getCsv(url,callback){
	httpRequest.get(url, function (err, res, body) {
	    if (!err && res.statusCode == 200) {
	        callback(body);
	    }
	})
}

function babyParseFunc (url,which) { 
	getCsv(url,function(res){
	var parsed = Baby.parse(res).data;
		if(which=='shift'){
		storeObj.shift=parsed;
		console.log(typeof storeObj.shift)
		} else if(which=='meta'){
		storeObj.meta=parsed;
		console.log(typeof storeObj.meta)
		}
	if(storeObj.shift!== undefined &&storeObj.meta!== undefined){
	storeObj.date = date;
		console.log(storeObj)
	db.DailyInfo.create(storeObj)
		}
	});
}


function getHedoData(){
	babyParseFunc(getShift,'shift') //babyfunc -> getCsv = returned
	babyParseFunc(getMetashift,'meta')
}
// getHedoData();
/*********************** SERVER ******************************/
app.listen(process.env.PORT || 3000, function() {
	console.log('BOOM, Express is firing on all cylinders');
});