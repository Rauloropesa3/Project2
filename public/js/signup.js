$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const firstNameInput = $("input#firstName-input");
  const lastNameInput = $("input#lastName-input");
  const userGender = $("input[name = 'gender']");
  const userBirthYear = $("input#birthyear-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      birthYear: userBirthYear.val().trim()
    };

    function radioValue() {
      for (i = 0; i < userGender.length; i++) {
        if (userGender[i].checked) {
          userData.gender = userGender[i].value;
        }
      }
    }
    radioValue();

    if (!userData) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName,
      userData.gender,
      userData.birthYear
    );
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName, gender, birthYear) {
    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      birthYear: birthYear
    })
      .then(() => {
        // window.location.replace("/index");
    $("#appBody").load("./login.html");

        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
