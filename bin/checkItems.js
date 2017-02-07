#!/usr/bin/env node
var express 	= require('express'),
	app 		= express(),	
	bodyParser	= require('body-parser'),
	httpRequest = require('request'),
	Baby	= require('babyparse'),
	mongoose = require('mongoose');
	mongoose.Promise = global.Promise,
	mongoose.createConnection(process.env.MONGODB_URI ||process.env.MONGOLAB_URI||
	process.env.MONGOHQ_URL);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var db = require('../models');
console.log('working...')
var date 	= new Date(),
	dd 		= date.getDate()-1,  //yesterdays info
	mm 		= date.getMonth()+1,
	yyyy	= date.getFullYear(),
	url		= 'http://hedonometer.org/data/shifts/world/',
	shift 	= '-shift.csv',
	metashift = '-metashift.csv';


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
			process.exit();
		}
	});
}

function getHedoData(){
	babyParseFunc(getShift,'shift') //babyfunc -> getCsv = returned
	babyParseFunc(getMetashift,'meta')
}
getHedoData();