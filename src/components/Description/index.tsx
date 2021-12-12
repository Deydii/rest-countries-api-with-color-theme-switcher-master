import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CountriesContext } from '../../context/countriesContext';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';
import Country from './Country';

import './style.scss';


const Description = () => {

  const { name } = useParams();
  
  const { countries } = useContext(CountriesContext);

  // Get infos of selected country
  const detailsCountry = countries.find(country => country.name === name);

  return(
      <div className="description">
      <Link to="/">
        <button
          className="description__button"
          type="button"
        >
          <IconContext.Provider value={{
            className: "description__button--icon"
          }}>
              <HiArrowNarrowLeft />
          </IconContext.Provider>
          <span>
            Back
          </span>
        </button>
      </Link>
      {detailsCountry && (
        <Country
          {...detailsCountry}
        />
      )}
    </div>
  )
};

export default Description;