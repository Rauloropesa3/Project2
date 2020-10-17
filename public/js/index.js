let userInfo;
$(document).ready(() => {

  const home = () => {
    $("#appBody").load("./home-page.html");
  }
  const login = () => {
    $("#appBody").load("./login.html");
  }
  const signup = () => {
    $("#appBody").load("./signup.html");
  }
  const injurySelection = () => {
    event.preventDefault()
  $( "#appBody" ).load( "./bodyPartCarousel.html" );
  }

  if (userInfo) {
    //Take the user to the main page 
  } else {
    //prompt user to login 
    login();
    // if user is not a member 
    // then, prompt user to sign up 
  }

 
});
