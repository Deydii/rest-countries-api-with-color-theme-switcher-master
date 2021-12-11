import { Link, useParams } from 'react-router-dom';
import { Countries } from '../../interfaces/types';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';
import Country from './Country';

import './style.scss';

interface SelectedCountry {
  countriesInfos : Countries[],
}

const Description = ({ countriesInfos }: SelectedCountry) => {

  const { name } = useParams();
  
  // Get infos of selected country
  const detailsCountry = countriesInfos.find(countryInfos => countryInfos.name === name);

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
          countries={countriesInfos}
          {...detailsCountry}
        />
      )
      }
    </div>
  )
};

export default Description;