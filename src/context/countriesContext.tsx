import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Countries } from '../interfaces/types';

interface AllCountriesContext {
  countries: Countries[],
  loading: boolean, 
  getSearchedCountry: (value: string) => void;
  error: boolean,
  country: Countries[];
  getFilteredRegion: (value: string) => void;
}

const defaultState = {
  countries: [],
  loading: false,
  getSearchedCountry: () => {},
  error: false,
  country: [],
  getFilteredRegion: () => {},
}

export const CountriesContext = createContext<AllCountriesContext>(defaultState);

export const CountriesContextProvider = ({ children }: {children: ReactNode}) => {

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Countries[]>([]);
  const [country, setCountry] = useState<Countries[]>([]);
  const [error, setError] = useState(false);

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

  const getSearchedCountry = (value: string):void => {
    const searchedCountry = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
    if (!searchedCountry.length) {
      setError(true);
    } else {
      setError(false)
    }
    setCountry(searchedCountry);
  };

  const getFilteredRegion = (value: string):void => {
    const filteredRegion = countries.filter(country => country.region.toLowerCase() === value.toLowerCase());
    setCountry(filteredRegion);
  };

  return (
    <CountriesContext.Provider value={{
        countries, 
        loading, 
        getSearchedCountry,
        error, 
        country,
        getFilteredRegion,
      }}>
      {children}
    </CountriesContext.Provider>
  )
};