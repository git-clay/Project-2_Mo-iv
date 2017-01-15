var db = require('../models');

function getDaily(req,res){
	db.DailyInfo.find(function(err,doc){
		// console.log(doc)
		res.json(doc);
	});
}


module.exports = {
	getDaily: getDaily
};