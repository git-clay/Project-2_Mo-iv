var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var QuestionSchema = new Schema({
	qOne:Object,
	qTwo:Array,
	qThree:[String],
	qFour:[String]
});



module.exports = mongoose.model('Question', QuestionSchema);