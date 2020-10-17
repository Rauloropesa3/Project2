$(document).ready(() => {
    $("#injurySelection").on("click", (event) => {
        event.preventDefault()
        $("#appBody").load("./bodyPartCarousel.html");
    })
    $.get("/api/user_data").then(data => {
        // console.log(data);
        $(".username").text(`Welcome ${data.firstName}`);
        
        const pastDiagnosis = JSON.parse(data.pastDiagnosis);
        let pastHistoryLi = "";

        pastDiagnosis.forEach((item, index) => {
            pastHistoryLi += `<li style="color: #f8f9fa;font-size: 20px;">${item}</li>`;
        });
        $(".pastHistory").html(pastHistoryLi);
})
})