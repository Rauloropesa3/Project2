$(document).ready(() => {

  const modalTitle = $("#modalTitle");
  const modalBody = $(".modal-body");
  const dialog = $('#symptomModal');
  let currentSymptomId = "";

  const displayTreatment = (data) => {
    const issueHtml = `<div> 
    <h2> ${data.name}</h2>
    <p> ${data.description}</p>
    <p> ${data.treatment}</p>
    <h3>${data.redFlag}</h3>
    </div>`;
    $('#diagnosisBtn').addClass('d-none');
    $('#treatmentBtn').addClass('d-none');
    modalBody.html(issueHtml);
    $('.modal-content').css('width', '800px');
    dialog.modal('show');
    modalTitle.html(`<div>TREATMENT</div>`)

  }
  const buildHtm = (data) => {
    let html = `<div>`;
    data.forEach((item, index) => {

      html += `<div class="custom-control custom-radio">
  <input type="radio" id="diagnosis${index}" name="diagnosis" class="custom-control-input" value="${item.issueId}">
  <label class="custom-control-label" for="diagnosis${index}">${item.name}</label>
  </div>`
    });
    html += `</div>`;
    modalBody.html(html);
  }
  let getDiagnosis = () => { };

  $("#diagnosisBtn").on("click", function (event) {
    event.preventDefault();
    const selectedSymptomsId = $('input[type=radio]:checked').val();
    if (selectedSymptomsId) {
      dialog.modal('hide');
      setTimeout(() => {
        getDiagnosis(selectedSymptomsId);
      }, 1000)
    } else {
      alert("please select a symptom")
    }
  });
  $("#treatmentBtn").on("click", function (event) {
    const selectedIssueId = $('input[type=radio]:checked').val();
    if (selectedIssueId) {
      event.preventDefault();
      dialog.modal('hide');
      $.get(`/api/issues/${selectedIssueId}/${currentSymptomId}`).then((data) => {
        setTimeout(() => {
          displayTreatment(data.issueObj);
        }, 1000)
      })
    } else {
      alert("please select one diagnosis")
    }


  });
  const getSymptoms = (subBodyId, title) => {
    $('#diagnosisBtn').removeClass('d-none');
    $('#treatmentBtn').addClass('d-none');
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

    getDiagnosis = (selectedSymptomsId) => {
      // const selectedSymptomsId = $('input[type=radio]:checked').val();
      $.get(`/api/diagnosis/${selectedSymptomsId}`).then((data) => {

        if (data.diagnostics) {
          currentSymptomId = data.symptomId;

          //Open the dialog to show user the result, if there is a diagnosis
          $('#treatmentBtn').removeClass('d-none');
          $('#diagnosisBtn').addClass('d-none');
          buildHtm(data.diagnostics);

          $('.modal-content').css('width', '');
          dialog.modal('show');
          modalTitle.html(`<div>Select a Diagnosis</div>`);


        } else if (data.issueObj) {
          displayTreatment(data.issueObj);
        } else {
          alert("please check server/api")
        }
      })

    };
    $('.modal-content').css('width', '');
    dialog.modal('show');
    modalTitle.html(`<div>${title}</div>`)
  }



  $("#knee-symptom").on("click", function (event) {
    event.preventDefault();

    getSymptoms(41, "Knee Symptoms");
  });

  $("#ankle-symptom").on("click", function (event) {
    event.preventDefault();
    getSymptoms(43, "Ankle Symptoms");

  });
  $("#shoulder-symptom").on("click", function (event) {
    event.preventDefault();
    getSymptoms(26, "Shoulder Symptoms");

  });
  $("#elbow-symptom").on("click", function (event) {
    event.preventDefault();
    getSymptoms(28, "Elbow Symptoms");

  });
  $("#wrist-symptom").on("click", function (event) {
    event.preventDefault();
    getSymptoms(29, "Wrist Symptoms");

  });

  $("#neck-symptom").on("click", function (event) {
    event.preventDefault();
    getSymptoms(6, "Neck Symptoms");

  });
  $("#hip-symptom").on("click", function (event) {
    event.preventDefault();
    getSymptoms(16, "Hip Symptoms");

  });

  $("#home").on("click", () => {
    $("#appBody").load("./home-pagehtml");

  })
});
