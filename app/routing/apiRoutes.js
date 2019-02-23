// // Your apiRoutes.js file should contain two routes:

// 1) A GET route with the url /api/friends. (This will be used to display a JSON of all possible friends.)

app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

// 2) A POST route /api/friends. (This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.)

app.post("/api/friends", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newUser = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newUser.routeName = newUser.name.replace(/\s+/g, "").toLowerCase();

    console.log(newUser);

    friends.push(newUser);

    res.json(newUser);
});

