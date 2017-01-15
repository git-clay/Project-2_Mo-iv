var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DailySchema = new Schema({
	date: Date,
	shiftArray: Array,
	metaShiftArray: Array
});

module.exports = mongoose.model('DailyInfo', DailySchema);