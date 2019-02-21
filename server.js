// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();

// Sets up for whichever port Heroku assigns, otherwise defaults to port 3000
var PORT = process.env.PORT || 3000;

// Sets up the Express app to allow middleware to handle data parsing of the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Friends (DATA)
// =============================================================
var friends = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Master",
    age: 55,
    forcePoints: 1350
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

// Displays all friends
app.get("/api/friends", function (req, res) {
  return res.json(friends);
});

// Displays a single friend, or returns false
// localhost:PORT/api/characters/yoda
app.get("/api/friends/:friends", function (req, res) {
  var chosen = req.params.friend;

  console.log(chosen);

  for (var i = 0; i < friends.length; i++) {
    if (chosen === friends[i].routeName) {
      return res.json(friends[i]);
    }
  }

  return res.json(false);
});

// Create New Friends - takes in JSON input
app.post("/api/friends", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newFriend = req.body;

  // Using a RegEx Pattern to remove spaces from newFriend
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

  console.log(newFriend);

  characters.push(newFriend);

  res.json(newFriend);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
