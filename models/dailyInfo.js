var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DailySchema = new Schema({
	date: Date,
	shift: Array,
	meta: Array
});

module.exports = mongoose.model('DailyInfo', DailySchema);