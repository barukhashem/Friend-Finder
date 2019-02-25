var friends = require("../data/friends")

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newFriend = req.body;
    var newFriendScore = newFriend.scores;
    var theMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity


    };
    //var leastDifference = 



    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;

      for (var j = 0; j < friends[i].scores.length; j++) {

        var num1 = parseInt(friends[i].scores[j]);
        var num2 = parseInt(newFriendScore[j]);

        //var singleDifference = Math.abs(num1 - num2);

        totalDifference += Math.abs(num2 - num1);

      }


      if (totalDifference <= theMatch.friendDifference) {
        theMatch.name = friends[i].name;
        theMatch.photo = friends[i].photo;
        theMatch.friendDifference = totalDifference;

      }
    };

    var modaldiv = $("<div>");
    modaldiv.text(theMatch.name);
    

    friends.push(newFriend);

    res.json(theMatch);
  });
};

//   app.post('/api/friends', function (req, res) {
//     var bestMatch = {
//       name: "",
//       photo: "",
//       friendDifference: 1000
//     };

//     var userData = req.body;
//     var userName = userData.name;
//     var userPhoto = userData.photo;
//     var userScores = userData.scores;

//     var totalDifference = 0;

//     for (var i = 0; i < friends.length; i++) {

//       console.log(friends[i].name);
//       totalDifference = 0;

//       for (var j = 0; j < friends[i].scores[j]; j++) {

//         totalDifference += Math.abs(parseInt(userScores[j]));

//         if (totalDifference <= bestMatch.friendDifference) {

//           bestMatch.name = friends[i].name;
//           bestMatch.photo = friends[i].photo;
//           bestMatch.friendDifference = totalDifference;
//         }
//       }
//     }

//     friends.push(userData);

//     res.json(bestMatch);
//   });
// }

// // // Your apiRoutes.js file should contain two routes:

// // 1) A GET route with the url /api/friends. (This will be used to display a JSON of all possible friends.)

// // 2) A POST route /api/friends. (This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.)

// // ===============================================================================
// // LOAD DATA
// // The following links the routes to a series of "data" sources that hold arrays of information on friends and questions:

// // This requires the correct file path for the friends data:


// // This requires the correct file path for the questions data:

// var questionsData = require("../data/questions");

// // ===============================================================================
// // ROUTING
// // ===============================================================================

// module.exports = function (app, friends) {
//   var friends = require("../data/friends");

//   // This GET route displays a JSON of all possible friends:

//   app.get("/api/friends", function (req, res) {
//     res.json(friendsData);
//   });


//   // This GET route displays a JSON of all possible questions: 
//   app.get("/api/questions", function (req, res) {
//     res.json(questionsData);
//   });

//   // This POST route handles incoming survey results and the compatibility logic:

//   app.post("/api/friends", function (req, res) {
//     // req.body hosts is equal to the JSON post sent from the user
//     // This works because of our body parsing middleware
//     var newFriend = req.body;
//     var friendScores = newFriend.scores;
//     var theMatch = {
//       name: "",
//       photo: "",
//     };
//     var leastDifference = 100

//     var totalDifference = 0;

//     friends.forEach(element => {
//       console.log(element);
//       for (var i = 0; i < newFriend.scores.length; i++) {

//         var num1 = newFriend.scores[i];
//         var num2 = element.scores[i];

//         var singleDifference = Math.abs(num1 - num2);

//         totalDifference = singleDifference + totalDifference;

//       }


//       if (totalDifference < leastDifference) {
//         leastDifference = totalDifference;
//         theMatch = element;
//       }
//     });

//     friends.push(newFriend);

//     res.json(theMatch);
//   });
// };
