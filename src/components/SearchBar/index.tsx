import Filter from './Filter/filter';

import './style.scss';

import { IoSearch } from 'react-icons/io5';
import { IconContext } from 'react-icons/lib';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <form className="search-bar__form">
        <input
          className="search-bar__form--input"
          type="text"
          placeholder="Search for a country..."
          value=""
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