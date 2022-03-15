import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Countries } from '../interfaces/types';

interface AllCountriesContext {
  countries: Countries[],
  loading: boolean, 
  getSearchedCountry: (value: string) => void;
  error: boolean,
  country: Countries[];
  filteredRegion: Countries[];
  getFilteredRegion: (value: string) => void;
  errorApi: boolean
}

const defaultState = {
  countries: [],
  loading: false,
  getSearchedCountry: () => {},
  error: false,
  country: [],
  filteredRegion: [],
  getFilteredRegion: () => {},
  errorApi: false
}

export const CountriesContext = createContext<AllCountriesContext>(defaultState);

export const CountriesContextProvider = ({ children }: {children: ReactNode}) => {

  const location = useLocation();

  const [isMounted, setIsMounted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Countries[]>([]);
  const [country, setCountry] = useState<Countries[]>([]);
  const [filteredRegion, setFilteredRegion] = useState<Countries[]>([]);
  const [error, setError] = useState(false);
  const [errorApi, setErrorApi] = useState(false);

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

    if (isMounted) {
    // get data only in first app render
    setLoading(true);
    setErrorApi(false);
    axios
      .get<Countries[]>('https://restcountries.com/v2/all')
      .then((response) => {
      const data = getData(response.data);
      setCountries(data);
      })
      .catch((error) => setErrorApi(true))
      .finally(() => setLoading(false));
    };

    return (() => setIsMounted(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    country.splice(0, country.length);
    filteredRegion.splice(0, filteredRegion.length);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const getSearchedCountry = (value: string):void => {

    // Clear filteredRegion array
     if (filteredRegion) {
      filteredRegion.splice(0, filteredRegion.length)
    };

    const searchedCountry = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
      if (!searchedCountry.length) {
        setError(true);
      } else {
        setError(false)
      };
      setCountry(searchedCountry);
  };

  const getFilteredRegion = (value: string):void => {

    // Clear country array
     if (country) {
       country.splice(0, country.length)
     };

    if (value !== "all") {
      const filteredRegion = countries.filter(country => country.region.toLowerCase() === value.toLowerCase());
      setFilteredRegion(filteredRegion);
    } else {
      setFilteredRegion([...countries])
    };
  };

  return (
    <CountriesContext.Provider value={{
      countries, 
      loading, 
      getSearchedCountry,
      error, 
      country,
      filteredRegion,
      getFilteredRegion,
      errorApi
    }}>
      {children}
    </CountriesContext.Provider>
  )
};