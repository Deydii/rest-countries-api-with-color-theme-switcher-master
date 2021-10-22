import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';

import './style.scss';

const Filter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClick = ():void => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div className="filter">
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
          <li id="africa" className="filter__select--region">Africa</li>
          <li id="america" className="filter__select--region">America</li>
          <li id="asia" className="filter__select--region">Asia</li>
          <li id="europe" className="filter__select--region">Europe</li>
          <li id="oceania" className="filter__select--region">Oceania</li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;