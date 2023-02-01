const KEY = 'https://restcountries.com/v3.1/name'

export const fetchCountries = name => {
  
  return fetch(`
    ${KEY}/${name}?fields=name,capital,population,flags,languages`
  )
      .then(response => {
      if (!response.ok) {
        throw new Error(text.status);
      }
      return response.json();
    })
   
};