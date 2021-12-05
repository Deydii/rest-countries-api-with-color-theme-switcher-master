import { useState, useEffect } from 'react';
import axios from 'axios';
import { Countries } from '../interfaces/types';

// get only data we use in the app
export const getData = (countriesInfos: Countries[]) => {
  return countriesInfos.map(countryInfo => ({
    name: countryInfo.name,
    topLevelDomain: countryInfo.topLevelDomain,
    alpha3Code: countryInfo.alpha3Code,
    capital: countryInfo.capital,
    subregion: countryInfo.subregion,
    region: countryInfo.region,
    population: countryInfo.population,
    borders: countryInfo.borders,
    nativeName: countryInfo.nativeName,
    currencies: countryInfo.currencies,
    languages: countryInfo.languages,
    flags: countryInfo.flags
  }))
}

export const useLoadData = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Countries[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Countries[]>(url)
      .then((response) => {
      const data = getData(response.data)
      setCountries(data)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [url]);
  
  return [loading, countries] as const;
};