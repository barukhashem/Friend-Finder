var friends = require("../data/friends")

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newFriend = req.body;
    // console.log(newFriend);
    var friendTotalScore = [];
    var newFriendScore = newFriend.scores;
    var theMatch = {
      name: "",
      photo: "",
      friendDifference: 0
    };
    // console.log("current array of new friends score");
    // console.log(newFriendScore);

    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      // console.log("length of scores:")
      // console.log(friends[i].scores.length);

      for (var j = 0; j < friends[i].scores.length; j++) {

        var num1 = parseInt(friends[i].scores[j]);
        var num2 = parseInt(newFriendScore[j]);

        // console.log("num1", num1);
        // console.log("num2", num2);
        totalDifference += Math.abs(num2 - num1);

      }
      friendTotalScore.push(totalDifference);
    };

    console.log(friendTotalScore);

    // within this array, find our largest number's index
    // Once found, which friend is it by that same index [i]?
    // Example: high number 22 is at index 3
    // friends[3]

    console.log(theMatch.friendDifference);
    console.log(totalDifference);

    if (totalDifference <= theMatch.friendDifference) {
      // console.log(friends[i].photo);
      // theMatch.name = friends[i].name;
      // theMatch.photo = friends[i].photo;
      // theMatch.friendDifference = totalDifference;
    }

    friends.push(newFriend);

    res.json(theMatch);
  });
};

