$(document).ready(() => {
        
            $.get("/api/symptoms/:subBodyId").then(data => {
              console.log(data);
            //   $(".username").text(`Welcome ${data.firstName}`);
            });
               
    
    });