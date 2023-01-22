import countries from '../data/countriesStates.js';
import data from '../data/nationalities.json' assert {type:'json'};

///////////////////////////// Form Validation /////////////////

$('#select-nationality').change((e) => {
  e.preventDefault();
  var target = e.currentTarget
  if (target.value !== "" || target.value.length > 0) {
    target.classList.remove("invalid");
    target.classList.add("valid");
  } else {
    target.classList.add("invalid");
    target.classList.remove("valid");
  }
})

$("form").submit((e) => {
  e.preventDefault();
});

//////////////////////////////// Load countries dropdown //////////////////////////
const populateSelect = () => {

  const countriesList = Object.keys(countries);

  const countySelect = document.getElementById('select-country');
  countriesList.filter((country) => {
    return country !== null;
  }).forEach((country) => {
    countySelect.innerHTML += `<option value=" ${country} "> ${country} </option>`;
  })
}

window.onload = populateSelect();




//////////////////////////// Load States of Selected Country ////////////////////////
$('#select-state').prop("disabled", true);
$('#select-country').on('change', function(e) {
  $('#select-state').empty();
  const countryId = $(this).find('option:selected')[0].index-1;
  
  const currentStates = Object.values(countries)[countryId];
  (countryId > -1 && currentStates?.length > 0) ? $('#select-state').prop("disabled", false) : $('#select-state').prop("disabled", true);
  (currentStates?.length > 0) && currentStates?.forEach((state) => {
    const stateOption = $("<option>").text(state);
    $('#select-state').append(stateOption);
  });
  (currentStates?.length === 0) && $('#select-state').append($("<option>").text('Skip this...'));
});


//////////////////////////// Load Nationalities Dropdown /////////////////////////////

data.forEach((country) => {
  const nationalityOption = $("<option>").text(country.nationality);
    $('#select-nationality').append(nationalityOption);
})

///////////////////////////// Submit Dialog //////////////////////////////


$(".submit-btn").on("click", function() {
  $(".popup-overlay, .popup-content").addClass("active");
});


$(".close, .popup-overlay").on("click", function() {
  $(".popup-overlay, .popup-content").removeClass("active");
});

////////////////////////// INT TEL INP ////////////////////////

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  initialCountry: "gr",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
