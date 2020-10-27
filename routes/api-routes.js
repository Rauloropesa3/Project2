/* eslint-disable prettier/prettier */
// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const medicApi = require("../medicApi");

module.exports = function (app) {
  let userInfo = {};

  const savePastDiagnosis = (symptomId)=>{
    db.symptoms.findOne({ where: { symptom_id: symptomId } }).then((data) => {
      // console.log(data.symptom_name, pastDiagnosis);

      const symptomName = data.symptom_name;
      const pastDiagnosis = userInfo.pastDiagnosis
      if (!pastDiagnosis){
        pastDiagnosis = "[]";
      }
      const arrayDiagnosis = JSON.parse(pastDiagnosis);
      arrayDiagnosis.push(symptomName);
  
      db.User.update({
       pastDiagnosis:JSON.stringify(arrayDiagnosis)
      }, {
        where: {
          email: userInfo.email
        }
      }).then(function(data) {
        // res.json(data);
        console.log(data);
        
      });
    });
  }
  const getIssueObject = (issueId, symptomId, res) => {
    // call medicApi to get issues with "issueId"

    medicApi(`issues/${issueId}/info`, "", (data) => {
      console.log(data);

      const issueObj = {
        name: data.Name,
        description: data.DescriptionShort,
        treatment: data.TreatmentDescription

      }
      medicApi("redflag", `symptomId=${symptomId}`, (redFlag) => {
        issueObj.redFlag = redFlag;
        res.send({ issueObj });

      })

    })
    const redFlag = "redFLag descriptions"; // Use the symptom id to to call medicApi to get the "redFlag" description 
  }
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      firstName: req.user.firstName,
      id: req.user.id,
      gender: req.user.gender,
      birthYear: req.user.birthYear,
      pastDiagnosis: req.user.pastDiagnosis
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
        // res.redirect(307, "/api/login");
        res.json({ created: true })
      })
      .catch(err => {
        // res.status(401).json(err);
        res.json({ created: false })

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
       
       userInfo = {
        firstName: req.user.firstName,
        id: req.user.id,
        gender: req.user.gender,
        birthYear: req.user.birthYear,
        pastDiagnosis: req.user.pastDiagnosis || "[]",
        email:req.user.email
      };
      res.json(userInfo);
    }
  });

  app.get("/api/pastInjuries", (req, res) => {
    const userEmail = "chukwuanumba@gmail.com"; // Will come from user info 
    db.User.findOne({ where: { email: userEmail } }).then((data) => {

      res.send(JSON.parse(data.pastDiagnosis));
    });


  });

  app.get("/api/symptoms/:subBodyId", (req, res) => {
    const subBodyId = req.params.subBodyId;
    const gender = "M"; // Gender will come from user info 

    db.symptoms.findAll({
      where: { gender: gender, sub_body_id: subBodyId }
    }).then((sympResults) => {
      res.json(sympResults);
    });
  });

  app.get("/api/diagnosis/:symptomId", (req, res) => {
    const symptomId = req.params.symptomId;
    savePastDiagnosis(symptomId);
    medicApi("diagnosis", `symptoms=[${symptomId}]&gender=male&year_of_birth=1988`, 
      (data) => {

      if (data.length === 1) {
        getIssueObject(data[0].issueId, symptomId, res);

      } else {
        //There are multiple diagnostics so send diagnostics for the user to choose 1 
        const diagnostics = data.map((item, index) => {
          return {
            name: item.Issue.Name,
            issueId: item.Issue.ID
          }
        })
        res.send({ diagnostics, symptomId })
      }
    });


  });

  app.get("/api/issues/:issueId/:symptomId", (req, res) => {
    console.log("description and treatment");
    const issueId = req.params.issueId;
    const symptomId = req.params.symptomId;
    getIssueObject(issueId, symptomId, res);
  })
};
