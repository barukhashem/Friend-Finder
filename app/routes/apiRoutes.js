// // Your apiRoutes.js file should contain two routes:

// 1) A GET route with the url /api/friends. (This will be used to display a JSON of all possible friends.)

// 2) A POST route /api/friends. (This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.)

// ===============================================================================
// LOAD DATA
// The following links the routes to a series of "data" sources that hold arrays of information on friends and questions:

// This requires the correct file path for the friends data:

var friendsData = require("../data/friends");

// This requires the correct file path for the questions data:

var questionsData = require("../data/questions");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app, friends) {

  // This GET route displays a JSON of all possible friends:

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });


  // This GET route displays a JSON of all possible questions: 
  app.get("/api/questions", function (req, res) {
    res.json(questionsData);
  });

  // This POST route handles incoming survey results and the compatibility logic:

  app.post("/api/friends", function (req, res) {
    friendsData.push(req.body);
  });

};
