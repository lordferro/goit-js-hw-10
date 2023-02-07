import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response)
    }

fetchCountries('Ukraine');

function response(r) {
      if (r.ok) {
        return r.json();
      }
      return Notify.failure('Oops, there is no country with that name');
    };

