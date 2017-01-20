// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");
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
// var userList =[

// ];
// var infoList = {
// 	date: '2017-10-04',
// 	shift: [['words',0.023432],['morewords',-0.124345]],
// 	meta: [0.1231,6.2345234]

// };
// db.DailyInfo.remove({}, function(err, doc){
// 	db.DailyInfo.create(infoList,function(err,daily){
// 		console.log('created',daily)
// 		process.exit();
// 	});
//   // db.User.create(userList, function(err, users){

//   // //   if (err) { return console.log('ERROR', err); }
//   // //   console.log("all users:", users);
//   // //   console.log("created", users.length, "users");
//   //   process.exit();
//   // });

// });



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
getHedoData();
