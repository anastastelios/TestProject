import countries from '../data/countriesStates.js';
import data from '../data/nationalities.json' assert { type: 'json' };
import occupations from '../data/occupationsList.js';
// import zipCodes from '../data/geonames-postal-code.json' assert {type: 'json'};

///////////////////////////// Form Validation /////////////////

$('#select-nationality').change((e) => {
  e.preventDefault();
  var target = e.currentTarget;
  if (target.value !== '' || target.value.length > 0) {
    target.classList.remove('invalid');
    target.classList.add('valid');
  } else {
    target.classList.add('invalid');
    target.classList.remove('valid');
  }
});

$('form').submit((e) => {
  e.preventDefault();
});

//////////////////////////////// Load countries dropdown //////////////////////////

const populateSelect = () => {
  const countriesList = Object.keys(countries);

  const countySelect = document.getElementById('select-country');
  countriesList
    .filter((country) => {
      return country !== null;
    })
    .forEach((country) => {
      countySelect.innerHTML += `<option value=" ${country} "> ${country} </option>`;
    });
};

window.onload = populateSelect();

//////////////////////////// Load States of Selected Country ////////////////////////

$('#select-state').prop('disabled', true);
$('#select-country').on('change', function (e) {
  $('#select-state').empty();
  const countryId = $(this).find('option:selected')[0].index - 1;

  const currentStates = Object.values(countries)[countryId];
  countryId > -1 && currentStates?.length > 0
    ? $('#select-state').prop('disabled', false)
    : $('#select-state').prop('disabled', true);
  currentStates?.length > 0 &&
    currentStates?.forEach((state) => {
      const stateOption = $('<option>').text(state);
      $('#select-state').append(stateOption);
    });
  currentStates?.length === 0 &&
    $('#select-state').append($('<option>').text('Skip this...'));
});

//////////////////////////// Load Nationalities Dropdown /////////////////////////////

data.forEach((country) => {
  const nationalityOption = $('<option>').text(country.nationality);
  $('#select-nationality').append(nationalityOption);
});

///////////////////////////// Submit Dialog //////////////////////////////

$('.submit-btn').on('click', function () {
  $('.popup-overlay, .popup-content').addClass('active');
});

$('.close, .popup-overlay').on('click', function () {
  $('.popup-overlay, .popup-content').removeClass('active');
});

////////////////////////// INT TEL INP ////////////////////////

const phoneInputField = document.querySelector('#phone');
const phoneInput = window.intlTelInput(phoneInputField, {
  initialCountry: 'gr',
  utilsScript:
    'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
});

///////////// Phone input validation ////////////////////////

phoneInputField.value = '+30';

phoneInputField.addEventListener('keyup', (e) => {
  if (isNaN(+e.key)) {
    e.preventDefault();
    phoneInputField.value = Array.from(phoneInputField.value)
      .splice(0, phoneInputField.value.length - 1)
      .join('');
  }
});

document.querySelector('.iti__selected-flag').addEventListener('blur', (e) => {
  phoneInputField.value = `+${e.target.title.split(': ')[1]}`;
});

////////////////////////// Autocomplete dropdown for Occupation ////////////////////////

const occupationInput = document.getElementById('occupation');
const occupationWrapper = document.querySelector('.input-field.occupation');
const resultsWrapper = document.querySelector('.results');

const renderResults = (results) => {
  if (!results.length) {
    resultsWrapper.classList.remove('has-matches');
    return occupationWrapper.classList.remove('show');
  }

  const content = results
    .slice(0, 4)
    .map((item) => {
      return `<li>${item}</li>`;
    })
    .join('');
  occupationWrapper.classList.add('show');
  resultsWrapper.classList.add('has-matches');
  resultsWrapper.innerHTML = `<ul>${content}</ul>`;
};

occupationInput.addEventListener('keyup', (e) => {
  let results = [];
  const input = e.target.value;
  if (input.length) {
    results = occupations.filter((o) => {
      return o.toLowerCase().includes(input.toLowerCase());
    });
  }

  renderResults(results);
});

occupationInput.addEventListener('focus', (e) => {
  if (resultsWrapper.innerHTML !== '') {
    resultsWrapper.classList.add('has-matches');
  }
});

resultsWrapper.addEventListener('click', (e) => {
  occupationInput.value = e.target.innerText;
  occupationInput.focus();
  resultsWrapper.innerHTML = '';
  resultsWrapper.classList.remove('has-matches');
});

$(document).on('click', function (e) {
  if ($(e.target).is('#occupation') === false) {
    resultsWrapper.classList.remove('has-matches');
  }
});

/////////////// Date picker restriction 18 and 137 ////////////////////

const todayArray = new Date().toISOString().split('T')[0].split('-');
const years18Array = `${todayArray[0] - 18}-${todayArray[1]}-${todayArray[2]}`;
const years137Array = `${todayArray[0] - 137}-${todayArray[1]}-${
  todayArray[2]
}`;

const birthInput = document.querySelector('#birth');
birthInput.setAttribute('min', years137Array);
birthInput.setAttribute('max', years18Array);

//////////////////////////// ZIP CODE API ////////////////////////
// const params = {
//   api_token: ,
//   zipcode_district:
// }
// const API_URL = 'https://georocket.net/api/street_names'
// fetch(API_URL, params).then((response) => {
//   const data = response.json();
// })

// const countryEl = document.querySelector('#select-country');
// const stateEl = document.querySelector('#select-state');
// countryEl.addEventListener('change', (e) => {
//   const countrySelected = data.find((country) => {
//     return countryEl.value.includes(country.en_short_name);
//     const nationalityOption = $("<option>").text(country.nationality);
//       $('#select-nationality').append(nationalityOption);
//   })
//   const countryCode = countrySelected.alpha_2_code;
//   const currentZipCodes = zipCodes.filter((zipCodeItm) => {
//     return zipCodeItm.country_code.includes(countryCode);
//   })
//   console.log(currentZipCodes)
//   const stateZipCodes = zipCodes.filter((zipCodeItm) => {
//     console.log({state: stateEl.value});
//     console.log(zipCodeItm.admin_name1)

//     return zipCodeItm.admin_name1 && zipCodeItm.admin_name1.includes(stateEl.value);
//   })
//   console.log(stateZipCodes)
// })
