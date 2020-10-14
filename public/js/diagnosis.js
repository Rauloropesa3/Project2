$(document).ready(() => {
  const modalTitle = $("#modalTitle");
  const modalBody = $(".modal-body");
  const dialog = $('#symptomModal');

  const getSymptoms = (subBodyId, title) => {
    $.get(`/api/symptoms/${subBodyId}`).then(data => {
      let html = `<div>`;
      data.forEach((item, index) => {

        html += `<div class="custom-control custom-radio">
        <input type="radio" id="symptom${index}" name="kneeSymptom" class="custom-control-input" value="${item.symptom_id}">
        <label class="custom-control-label" for="symptom${index}">${item.symptom_name}</label>
      </div>`
      });
      html += `</div>`
      modalBody.html(html)
    });
    getDiagnosis = (symptomId) => {
      const selectedSymptoms = $('input[type=radio]:checked').val();
      $.get(`/api/diagnosis/${symptomId}`).then((data) => {
       
      })
      // Call api to get the issue object using "selectedSymptoms"
      //Open the dialog to show user the result, if it is diagnosis
      // otherwise open the dialog and show the user more diagnosis to select from  
      alert(`symptom id = ${selectedSymptoms}`)
    };

    dialog.modal('show');
    modalTitle.html(`<div>${title}</div>`)
  }
  let getDiagnosis = () => {
    alert("diagnosis worked")

  }
  $("#diagnosisBtn").on("click", function () {
    dialog.modal('hide');
    getDiagnosis();

  });

  $("#knee-symptom").on("click", function (event) {
    event.preventDefault();

    getSymptoms(41, "Knee Symptoms");
  });

  $("#ankle-symptom").on("click", function (event) {
    event.preventDefault();
    getSymptoms(43, "Ankle Symptoms");

  });

});