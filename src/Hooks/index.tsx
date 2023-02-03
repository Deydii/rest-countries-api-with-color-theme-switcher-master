import { Countries } from '../interfaces/types';

export const getData = (countryInfos: Countries) => {
  return ({
    name: countryInfos.name,
    topLevelDomain: countryInfos.topLevelDomain,
    alpha3Code: countryInfos.alpha3Code,
    capital: countryInfos.capital,
    subregion: countryInfos.subregion,
    region: countryInfos.region,
    population: countryInfos.population,
    borders: countryInfos.borders,
    nativeName: countryInfos.nativeName,
    currencies: countryInfos.currencies,
    languages: countryInfos.languages,
    flags: countryInfos.flags
  })
}
