$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    console.log(data);
    $(".username").text(`Welcome ${data.firstName}`);
  });
});
