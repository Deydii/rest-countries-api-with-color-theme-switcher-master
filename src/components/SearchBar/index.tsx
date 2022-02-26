import React, { useState, useContext } from 'react';
import { CountriesContext } from '../../context/countriesContext';
import Filter from './Filter/filter';
import { IoSearch } from 'react-icons/io5';
import { IconContext } from 'react-icons/lib';

import './style.scss';

const SearchBar = () => {

  const { getSearchedCountry } = useContext(CountriesContext);

  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    getSearchedCountry(e.target.value);
  };

  return (
    <div className="search-bar">
      <form className="search-bar__form">
        <input
          className="search-bar__form--input"
          type="text"
          placeholder="Search for a country..."
          value={inputValue}
          onChange={handleOnChange}
        />
        <IconContext.Provider value={{
          className: "search-bar__form--icon"
        }}>
          <IoSearch  />
        </IconContext.Provider>
      </form>
      <Filter />
    </div>
  );
};

export default SearchBar;