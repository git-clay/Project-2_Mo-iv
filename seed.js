// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var userList =[

];
var infoList = {
	date: '2017-10-04',
	shiftArray: [['words',0.023432],['morewords',-0.124345]],
	metaShiftArray: [0.1231,6.2345234]

};
// db.User.remove({}, function(err, doc){
	db.DailyInfo.create(infoList,function(err,daily){
		console.log('created',daily)
		process.exit();
	});
  // db.User.create(userList, function(err, users){

  // //   if (err) { return console.log('ERROR', err); }
  // //   console.log("all users:", users);
  // //   console.log("created", users.length, "users");
  //   process.exit();
  // });

// });
