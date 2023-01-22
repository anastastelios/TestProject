import countries from '../data/countriesStates.js';
import data from '../data/nationalities.json' assert {type:'json'};
import occupations from '../data/occupationsList.js';

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

// phoneInputField.addEventListener('change', (e) => {
//   $('#phone').innerText = `+${phoneInput.b.dataset.dialCode}${$('#phone').value}`
// })
phoneInputField.value = '+30';

phoneInputField.addEventListener('keyup', (e) => {
  if (isNaN(+e.key)) {
    e.preventDefault();
    phoneInputField.value = Array.from(phoneInputField.value).splice(0, phoneInputField.value.length-1).join('');
  }
})

document.querySelector('.iti__selected-flag').addEventListener('blur', (e) => {
  phoneInputField.value = `+${e.target.title.split(': ')[1]}`
});

console.log(phoneInput.b.dataset.countyCode);
console.log(phoneInput.b.dataset.dialCode);

////////////////////////// Autocomplete dropdown for Occupation ////////////////////////

const occupationInput = document.getElementById('occupation');
const occupationWrapper = document.querySelector('.input-field.occupation');
const resultsWrapper = document.querySelector('.results');

const renderResults = (results) => {
  if(!results.length) {
    resultsWrapper.classList.remove('has-matches');
    return occupationWrapper.classList.remove('show');
  }

  const content = results.slice(0,4).map((item) => {
    return `<li>${item}</li>`;
  }).join('');
  occupationWrapper.classList.add('show');
  resultsWrapper.classList.add('has-matches');
  resultsWrapper.innerHTML = `<ul>${content}</ul>`
  console.log(resultsWrapper)

}

occupationInput.addEventListener('keyup', (e) => {
  let results = [];
  const input = e.target.value;
  if (input.length) {
    results = occupations.filter((o) => {
      return o.toLowerCase().includes(input.toLowerCase());
    })
  }

  renderResults(results);
})

resultsWrapper.addEventListener('click', (e) => {
	occupationInput.value = e.target.innerText;
	occupationInput.focus();
	resultsWrapper.innerHTML = '';
	resultsWrapper.classList.remove('has-matches');
});

