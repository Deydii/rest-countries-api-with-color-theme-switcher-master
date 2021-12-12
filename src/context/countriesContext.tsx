import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Countries } from '../interfaces/types';

interface AllCountriesContext {
  countries: Countries[],
  loading: boolean,
}

const defaultState = {
  countries: [],
  loading: false
}

export const CountriesContext = createContext<AllCountriesContext>(defaultState);

export const CountriesContextProvider = ({ children }: {children: ReactNode}) => {

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Countries[]>([]);

  // get only data we use in the app
  const getData = (countriesInfos: Countries[]) => {
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

  useEffect(() => {
    // get data only in first app render
    setLoading(true);
    axios
      .get<Countries[]>('https://restcountries.com/v2/all')
      .then((response) => {
      const data = getData(response.data)
      setCountries(data)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CountriesContext.Provider value={{countries, loading}}>
      {children}
    </CountriesContext.Provider>
  )
};