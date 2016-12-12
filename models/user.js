var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	login: {
		email: String,
		password : String
	},
	name: String,
	goals:[String]
});

User.methods.encrypt = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); //sync is to run in order //8 is the complexity level
};

User.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);