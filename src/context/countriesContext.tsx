import { createContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { loadData } from '../components/Api';
import { Countries } from '../interfaces/types';

interface AllCountriesContext {
  countries: Countries[],
  isLoading: boolean,
  isError: boolean,
  getSearchedCountry: (value: string) => void;
  searchedCountry: string,
  getFilteredRegion: (value: string) => void;
  filteredRegion: string,
}

const defaultState = {
  countries: [],
  isLoading: false,
  isError: false,
  getSearchedCountry: () => {},
  searchedCountry: "",
  getFilteredRegion: () => {},
  filteredRegion: ""
}

export const CountriesContext = createContext<AllCountriesContext>(defaultState);

export const CountriesContextProvider = ({ children }: {children: ReactNode}) => {

  const [countries, setCountries] = useState<Countries[]>([]);
  const [searchedCountry, setSearchedCountry] = useState('');
  const [filteredRegion, setFilteredRegion] = useState('');

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
      setCountries(dataApi);
    }
  }, [data]);


  const getSearchedCountry = (value: string):void => {
    setSearchedCountry(value)
  };

  const getFilteredRegion = (value: string):void => {
    if (value !== "All") {
    setFilteredRegion(value)
    } else {
      setFilteredRegion("")
    }
  };

  return (
    <CountriesContext.Provider value={{
      countries, 
      isLoading,
      isError,
      getSearchedCountry,
      searchedCountry,
      getFilteredRegion,
      filteredRegion
    }}>
      {children}
    </CountriesContext.Provider>
  )
};