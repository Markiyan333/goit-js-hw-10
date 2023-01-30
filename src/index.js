import './css/styles.css';
import { fetchCountries } from '../src/restCountriesApi';
import Lodash from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', Lodash(returnInput, DEBOUNCE_DELAY));

function returnInput (e) {
    e.preventDefault();
    const inputValue = input.value.trim();
    clearHTML();
    if (inputValue === '') {
        return;
    } 
    fetchCountries(inputValue).then(countries => {
        if (countries.length > 10){
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");

        } else if(countries.length >= 2 && countries <= 10 ){
        renderCountries(countries)
        } else if (countries.length === 1){
         renderUserList(countries)
        }

  })
  .catch(error => {
   Notiflix.Notify.failure('Oops, there is no country with that name');
  });

}
function renderUserList(users) {
  const markup = users
    .map((user) => {
        return `<li>
           <img src='${user.flags.svg}'alt='flags off ${user.name.official}' width = "30" heigth = "20"> 
          <p><b>Name</b>: ${user.name.official}</p>
          <p><b>Capital</b>: ${user.capital}</p>
          <p><b>Population</b>: ${user.population}</p>
            <p><b>languages</b>: ${Object.values(user.languages) }</p>
        </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
}

function renderCountries (users) {
  const markup = users
    .map((user) => {
        return `<li>
           <img src='${user.flags.svg}'alt='flags off ${user.name.official}' width = "30" heigth = "20"> 
          <p><b>Name</b>: ${user.name.official}</p>
        </li>`;
    })
    .join("");
 countryList.innerHTML = markup;
}

function clearHTML() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

