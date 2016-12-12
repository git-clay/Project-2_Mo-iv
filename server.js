/****************** require express, bodyParser, and ./models**************************/
var express 	= require('express'),
	app 		= express(),	
	mongoose    = require('mongoose'),
	passport     = require('passport'),
	flash        = require('connect-flash'),
	morgan       = require('morgan'),
	cookieParser = require('cookie-parser'),
	session      = require('express-session');
	bodyParser		= require('body-parser');
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(morgan('dev'));

/*********************** DATABASE ******************************/

var db = require('./models');

/*********************** ROUTES ******************************/
var routes = require('./routes/routes.js');
app.use(routes);

app.use(express.static(__dirname+'public'));

/*********************** VIEWS ******************************/
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

/*********************** PASSPORT ******************************/
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/passport.js');

/***********************  ******************************/

/*********************** INDEX ******************************/




/*********************** SHOW ******************************/




/*********************** CREATE (POST) ******************************/




/*********************** UPDATE(PUT) ******************************/




/*********************** DELETE ******************************/

/*********************** SERVER ******************************/
app.listen(process.env.PORT || 3000, function() {
	console.log('BOOM, Express is firing on all cylinder');
});

