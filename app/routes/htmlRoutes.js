// Your htmlRoutes.js file should include two routes:

// 1) A GET Route to /survey which should display the survey page.

// 2) A default, catch-all route that leads to home.html which displays the home page.

// DEPENDENCIES
// This requires the path package to get the correct file path for the html:

var path = require("path");

module.exports = function (app) {
  // ROUTES
  // This route sends the user first to the AJAX page:
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // This route sends the user first to the survey page:
  app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  // If no matching route is found, then it defaults to the home page:
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
