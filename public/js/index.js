$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    $(".username").text(data.firstName);
  });
});
