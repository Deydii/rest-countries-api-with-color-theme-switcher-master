import { rest } from 'msw';
import countries from './countries.json';


export const handlers = [
  // Get all countries
  rest.get('https://restcountries.com/v2/all', (req, res, ctx) => {
    const countriesInfos = countries.map(country => {
      return ({
        name: country.name,
        topLevelDomain: country.topLevelDomain,
        alpha3Code: country.alpha3Code,
        capital: country.capital,
        subregion: country.subregion,
        region: country.region,
        population: country.population,
        borders: country.borders,
        nativeName: country.nativeName,
        currencies: country.currencies,
        languages: country.languages,
        flags: country.flags
      })
    });
    return res(
      ctx.status(200),
      ctx.json(countriesInfos)
    )
  }),

  // Get country details
  rest.get('https://restcountries.com/v2/alpha/:countryCode', (req, res, ctx) => {
    const { countryCode } = req.params;
    const countryInfos = countries.find(country => country.alpha3Code === countryCode);
    return res(
      ctx.status(200),
      ctx.json({ 
        name: countryInfos?.name,
        topLevelDomain: countryInfos?.topLevelDomain,
        alpha3Code: countryInfos?.alpha3Code,
        capital: countryInfos?.capital,
        subregion: countryInfos?.subregion,
        region: countryInfos?.region,
        population: countryInfos?.population,
        nativeName: countryInfos?.nativeName,
        currencies: countryInfos?.currencies,
        languages: countryInfos?.languages,
        flags: countryInfos?.flags,
        borders: countryInfos?.borders
    }),
    );
  }),
];