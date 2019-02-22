// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

var friends = require("./app/data/friends");
// console.log(friends);
// Sets up the Express App
// =============================================================
var app = express();

// Sets up for whichever port Heroku assigns, otherwise defaults to port 3000
var PORT = process.env.PORT || 3000;

// Sets up the Express app to allow middleware to handle data parsing of the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var user1 = users[0].scores;
var user2 = users[1].scores;
var user3 = users[2].scores;
console.log(user1, user2);
var totalDifference = 0;

for (var i = 0; i < user1.length; i++) {
  // console.log(user1[i], user2[i]);
  var num1 = user1[i];
  var num2 = user2[i];
  var singleDifference = Math.abs(num1 - num2);
  console.log(singleDifference);
  totalDifference = singleDifference + totalDifference;
}
console.log(totalDifference);

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

// Displays all users
app.get("/api/friends", function (req, res) {
  return res.json(users);
});

// Displays a single user, or returns false
// localhost:PORT/api/characters/yoda
app.get("/api/friends/:friends", function (req, res) {
  var chosen = req.params.user;

  console.log(chosen);

  for (var i = 0; i < users.length; i++) {
    if (chosen === users[i].routeName) {
      return res.json(users[i]);
    }
  }

  return res.json(false);
});

// Create New Friends - takes in JSON input
app.post("/api/friends", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newUser = req.body;

  // Using a RegEx Pattern to remove spaces from newFriend
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newUser.routeName = newUser.name.replace(/\s+/g, "").toLowerCase();

  console.log(newUser);

  friends.push(newUser);

  res.json(newUser);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

