/* eslint-disable prettier/prettier */
// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  const getIssueObject = (issueId, symptomId)=>{
    // call medicApi to get issues with "issueId"
    const redFlag = "redFLag descriptions"; // Use the symptom id to to call medicApi to get the "redFlag" description 
    return {
      name: "issue name",
      description: "short description from issue",
      treatment: "treatment for this issue",
      redFlag
    };
  };
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      firstName: req.user.firstName,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      birthYear: req.body.birthYear
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        firstName: req.user.firstName,
        id: req.user.id
      });
    }
  });

  app.get("/api/pastInjuries", (req, res)=>{
    const userEmail = "chukwuanumba@gmail.com"; // Will come from user info 
    db.User.findOne({where:{email: userEmail}}).then((data)=>{
      
      res.send(JSON.parse(data.pastDiagnosis));
    });

    
  });

  app.get("/api/symptoms/:subBodyId", (req, res)=>{
    const subBodyId = req.params.subBodyId;
    const gender = "M"; // Gender will come from user info 

    db.symptoms.findAll({
      where:{gender: gender,sub_body_id: subBodyId }
    }).then((sympResults) => {
      res.json(sympResults);
    });
  }); 

  app.get("/api/diagnosis/:symptomId", (req, res)=>{
    console.log("diagnosis");
    const symptomId = req.params.symptomId;
    const diagnostics = [ // Call medicApi with "symptomId" to get a list a diagnosis                  
      { name: "diagnosis1",issueId:157},
      { name: "diagnosis2",issueId:222},
      { name: "diagnosis3",issueId:420},
    ];
    if (diagnostics.length === 1){
      const issueObj = getIssueObject (diagnostics[0].issueId, symptomId);
      res.send({issueObj});
      
    }else{
      //There are multiple diagnostics so send diagnostics for the user to choose 1 
      res.send({diagnostics, symptomId});
    }
  });

  app.get("/api/issues/:issueId/:symptomId", (req,res)=>{
    console.log("description and treatment");
    const issueId =req.params.issueId;
    const symptomId =req.params.symptomId;
    const issueObj = getIssueObject (issueId, symptomId);
    res.send(issueObj);
  });
};
