// DEPENDENCIES
// These are a series of npm packages used to give the server useful functionality:
var express = require("express");
var path = require("path");

var friends = require("./app/data/friends");
// console.log(friends);

// =============================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for the express server and tells node that I'm creating an "express" server:
var app = express();

// This sets up for whichever port Heroku assigns, otherwise it defaults to port 3000:
var PORT = process.env.PORT || 3000;

// This sets up the Express app to allow middleware to handle data parsing of the body of the request:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =============================================================
// LISTENER
// This "starts" the server to begin listening:
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// ROUTER
// The routes below point the server to a series of route map files to direct it when users visit or request data from the URLs:
require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

// =============================================================
// GLOBAL VARIABLES:
var user1 = friends[0].scores;
var user2 = friends[1].scores;
console.log(user1, user2);
var totalDifference = 0;

console.log(totalDifference);

for (var i = 0; i < friends.length; i++) {
  console.log(friends[i]);
}

// =============================================================
// This displays all friends:
app.get("/api/friends", function (req, res) {
  return res.json(friends);
});

// This displays a single friend or returns false:
// localhost:PORT/api/characters/yoda
app.get("/api/friends/:friends", function (req, res) {
  var chosen = req.params.user;

  console.log(chosen);

  for (var i = 0; i < friends.length; i++) {
    if (chosen === friends[i].routeName) {
      return res.json(friends[i]);
    }
  }

  return res.json(false);
});

// This creates new friends and receives JSON input:
app.post("/api/friends", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newFriend = req.body;

  // This uses a RegEx Pattern to remove spaces from newFriend
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

  console.log(newFriend);

  friends.push(newFriend);

  res.json(newFriend);
});