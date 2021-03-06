var expect = require('chai').expect;
var server = require('../server.js');
var usrCont = require('../controllers/userController.js');
var models = require('../models');

describe('Testing server', function(){
	before(function(){
		server.listen (process.env.PORT || 3000);
	});
	it('Should send a 200 response',function(){
		request.get(options, function (err, res, body) {
		    expect(res.statusCode).to.equal(200);
		    expect(res.body).to.equal('correct header');
		    done();
		  });
	});

	 
	after(function(){
		server.close();
	});
});

describe('Pulling & saving from hedonometer',function(){

});

describe('Testing API', function(){
	it('INDEX should get all objects');
	it('SHOW should get specified id');
	it('POST should add to the api');
	it('PUT should edit an object in the api');
	it('DELETE d3sTr0y5! an api object');
});

describe('Register new account', function(){

});

describe('Login', function(){

});

describe('Analysis of phrase',function(){
	it('should return the sentiment Analysis score for each word');
	it('should average all words in the phrase');
	it('should return the top and bottom scored words');
	it('should return the part of speech for the top and bottom words');
	it('should post to my most common words api');

});

describe('Store metric data for all time averages (this api)',function(){

});