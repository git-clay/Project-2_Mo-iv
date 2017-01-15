var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||process.env.MONGOLAB_URI||
	process.env.MONGOHQ_URL ||"mongodb://localhost/p2");

module.exports.User = require('./user.js');
module.exports.DailyInfo=require('./dailyInfo.js');
module.exports.Question=require('./qModel.js');