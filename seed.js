// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var userList =[

];

db.User.remove({}, function(err, doc){

  db.User.create(userList, function(err, users){
  //   if (err) { return console.log('ERROR', err); }
  //   console.log("all users:", users);
  //   console.log("created", users.length, "users");
    process.exit();
  });

});
