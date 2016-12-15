var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	local: {
		email: String,
		password : String
	},
	name: String,
	goals:[String],
	qOne:[String],
	qTwo:[String],
	qThree:[String],
	qFour:[String]
});

UserSchema.methods.encrypt = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); //sync is to run in order //8 is the complexity level
};

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);