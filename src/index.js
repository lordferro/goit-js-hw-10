import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  country: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const searchQuery = e.target.value.trim();
  if (searchQuery === '') {
    refs.country.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }
  fetchCountries(searchQuery)
    .then(getCountryArray)
    .catch(error => console.log(error));
}

function getCountryArray(array) {
  if (array.length > 10) {
    refs.country.innerHTML = '';
    refs.countryList.innerHTML = '';
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (array.length > 1 && array.length <= 10) {
    refs.country.innerHTML = '';
    const listOfCountries = createListMarkup(array);
    populateCountries(listOfCountries);
  } else {
    refs.countryList.innerHTML = '';
    createMarkupCountry(array);
  }
}

function createMarkupCountry([
  { name, capital, population, languages, flags },
]) {
  return (refs.country.innerHTML = `<h2><img width="20" height="12" src="${
    flags.svg
  }" alt=""> ${
    name.official
  }</h2><ul><li>Capital: ${capital}</li><li>Population: ${population}</li><li>Languages: ${Object.values(
    languages
  )}</li></ul>`);
}

function createListMarkup(items) {
  return items
    .map(
      item =>
        `<li><img width="20" height="12" src="${item.flags.svg}" alt=""> ${item.name.official}</li>`
    )
    .join('');
}

function populateCountries(markup) {
  return (refs.countryList.innerHTML = markup);
}

// ___________________________
// // invoke function create markup
// const lisItemsMarkup = createListItemsMarkup(tech);

// // insert markup
// populateList(lisItemsMarkup);

// // function create markup
// function createListItemsMarkup(items) {
//     return items.map(item => `<li>${item.label}</li>`).join("");
// }

// // filter function
// function onFIlterChange(evt) {
//   console.log("INPUT");
//     const valuesToFilter =
//     evt.target.value.toLowerCase();

//   // filtering, checking if typed symbols included in list items
//   const filteredItems = tech.filter((t) =>
//     t.label.toLowerCase().includes(valuesToFilter)
//   );

//   // invoke function create markup with filtered Items
//   const lisItemsMarkup = createListItemsMarkup(
//     filteredItems
//   );

//   // insert markup with filtered items, using innerHTML so we rewrite old markup
//   populateList(lisItemsMarkup);
// }

// function populateList(markup) {
//     refs.list.innerHTML = markup;
// }

/* <svg class="envelope" width="16" height="12">
  <use href="./img/icons.svg#icon-envelope"></use>
</svg>; */
