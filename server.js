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
	schedule	= require('node-schedule')
	Papa	= require('papaparse');	//need to add 'var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;' to papaparse file
	// babyparse	= require(babyparse);
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

var shiftRes,
	metashiftRes;

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

console.log('date:',date,'rule:',rule,'schedule',schedule)

if(dd<10) {dd='0'+dd;} 
if(mm<10) {mm='0'+mm;} 
date =	yyyy+'-'+ mm +'-'+dd;

var getShift = url+date+shift,
	getMetashift = url+date+metashift;

function getHedoData(){
var shiftArr =[],
	shiftRes,
	metashiftRes,
	storeObj={};
	console.log('in getHedoData',date)
	Papa.parse(getShift, {
		download: true,
		complete: function(results) {
			shiftRes = results.data;	//shift is the top words of the day
			for(var i=1;i<shiftRes.length;i++){
				shiftArr.push([shiftRes[i][1],parseFloat(shiftRes[i][0])]);
			}
		}
	});

	Papa.parse(getMetashift, {
		download: true,
		complete: function(results) {
			metashiftRes = results.data; //metashift is the overall average scores
		}
	});  
	storeObj={'date':date,'shiftArray': shiftArr,'metaShiftArray': metashiftRes}    
		console.log(storeObj)

	db.DailyInfo.create(storeObj,function(err,daily){
		process.exit();
	});
}
getHedoData();
//might need 'baby parse instead of papaparse!!!!'
// pass in the contents of a csv file 
// parsed = Baby.parse(csv);
 
// // voila 
// rows = parsed.data;

/*********************** SERVER ******************************/
app.listen(process.env.PORT || 3000, function() {
	console.log('BOOM, Express is firing on all cylinders');
});

