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
	app.use(morgan('dev'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost/local-authentication-with-passport'); 


/*********************** DATABASE ******************************/

var db = require('./models');
app.use(express.static('public'));




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
	console.log(res,req.user);

	res.locals.currentUser = req.user;
	next();
});
/*********************** ROUTES ******************************/
var routes = require('./routes/routes.js');
app.use(routes);


/***********************  ******************************/



/*********************** SERVER ******************************/
app.listen(process.env.PORT || 3000, function() {
	console.log('BOOM, Express is firing on all cylinders');
});

