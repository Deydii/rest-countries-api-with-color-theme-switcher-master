import React, { useState, useContext } from 'react';
import { CountriesContext } from '../../../context/countriesContext';
import { ThemeContext } from '../../../context/themeContext';
import { IoIosArrowDown } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';

import './style.scss';

const Filter = () => {

  const { getFilteredRegion } = useContext(CountriesContext);
  const { theme } = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClick = ():void => {
    setIsOpen(!isOpen);
  };

  const handleOnClickRegion = (e: React.MouseEvent):void => {
    const value = e.target as HTMLLIElement;
    getFilteredRegion(value.id);
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div className={theme === "dark" ? "filter filter--dark" : "filter"}>
        Filter by Region
        <IconContext.Provider value={{
          className:"filter__icon"
        }}
        >
          <IoIosArrowDown onClick={handleOnClick} />
        </IconContext.Provider>
      </div>
      <div 
        className={isOpen ? "filter__select" : "filter__select--hide"}
      >
        <ul>
          <li id="africa" className="filter__select--region" onClick={handleOnClickRegion}>Africa</li>
          <li id="americas" className="filter__select--region" onClick={handleOnClickRegion}>Americas</li>
          <li id="asia" className="filter__select--region" onClick={handleOnClickRegion}>Asia</li>
          <li id="europe" className="filter__select--region" onClick={handleOnClickRegion}>Europe</li>
          <li id="oceania" className="filter__select--region" onClick={handleOnClickRegion}>Oceania</li>
        </ul>
      </div>
    </div>
  );
};
export default Filter;