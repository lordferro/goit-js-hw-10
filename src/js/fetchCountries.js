import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response)
    }

function response(r) {
      if (!r.ok) {
        Notify.failure('Oops, there is no country with that name');
        throw new Error(r.status)
      }
      return r.json(); 
    };

