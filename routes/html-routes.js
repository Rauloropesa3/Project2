// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/index", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/diagnosis", (req, res) => {
    // If the user already has an account send them to the members page

    res.sendFile(path.join(__dirname, "../public/diagnosis.html"));
  });
  app.get("/symptoms", (req, res) => {
    // If the user already has an account send them to the members page

    res.sendFile(path.join(__dirname, "../public/symptoms.html"));
  });
  app.get("/home-page", (req, res) => {
    // If the user already has an account send them to the members page

    res.sendFile(path.join(__dirname, "../public/home-page.html"));
  });
  app.get("/bodyPartCarousel", (req, res) => {
    // If the user already has an account send them to the members page

    res.sendFile(path.join(__dirname, "../public/bodyPartCarousel.html"));
  });
  app.get("/therapy", (req, res) => {
    // If the user already has an account send them to the members page

    res.sendFile(path.join(__dirname, "../public/therapy.html"));
  });
};
