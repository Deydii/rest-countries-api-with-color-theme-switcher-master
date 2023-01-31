import { createContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { loadData } from '../components/Api';
import { Countries } from '../interfaces/types';

interface AllCountriesContext {
  countries: Countries[],
  isLoading: boolean,
  isError: boolean,
  getSearchedCountry: (value: string) => void;
  searchedCountryError: boolean,
  country: Countries[];
  filteredRegion: Countries[];
  getFilteredRegion: (value: string) => void;
}

const defaultState = {
  countries: [],
  isLoading: false,
  isError: false,
  getSearchedCountry: () => {},
  searchedCountryError: false,
  country: [],
  filteredRegion: [],
  getFilteredRegion: () => {},
}

export const CountriesContext = createContext<AllCountriesContext>(defaultState);

export const CountriesContextProvider = ({ children }: {children: ReactNode}) => {

  const location = useLocation();

  //const [isMounted, setIsMounted] = useState(true);
  const [countries, setCountries] = useState<Countries[]>([]);
  const [country, setCountry] = useState<Countries[]>([]);
  const [filteredRegion, setFilteredRegion] = useState<Countries[]>([]);
  const [searchedCountryError, setSearchedCountryError] = useState(false);

  const { isLoading, isError, data } = useQuery<Countries[]>('countriesInfos', () => loadData('https://restcountries.com/v2/all'));

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
    if (data) {
      const dataApi = getData(data);
      setCountries(dataApi)
    }
  }, [data]);

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
        setSearchedCountryError(true);
      } else {
        setSearchedCountryError(false)
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
      isLoading,
      isError,
      getSearchedCountry,
      searchedCountryError,
      country,
      filteredRegion,
      getFilteredRegion,
    }}>
      {children}
    </CountriesContext.Provider>
  )
};