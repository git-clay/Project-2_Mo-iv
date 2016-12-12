var mongoose = require('mongoose');
mongoose.connect(process.envMONGODB_URI ||process.env.MONGOLAB_URI||
	process.env.MONGOHQ_URL ||"mongodb://localhost/");

module.exports.User = require('./user.js');
module.exports.DailyInfo=require('./dailyInfo');