import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CountriesContext } from '../../context/countriesContext';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';
import Country from './Country';

import { Countries } from '../../interfaces/types';

import './style.scss';

const Description = () => {

  const [borderCountries, setborderCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Get URL params
  const { name } = useParams();
  
  // All countries
  const { countries } = useContext(CountriesContext);

  // Get infos of selected country
  const detailsCountry = countries.find(country => country.name === name);

  useEffect(() => {

    // Get all codes of border countries for axios request
    const borderCodes = detailsCountry?.borders?.map(border => border);
    const codes = borderCodes?.join(",");

    if (borderCodes) {
    setLoading(true);
    axios.get<Countries[]>(`https://restcountries.com/v2/alpha?codes=${codes}`)
    .then((response) => {
      // Get names of border countries
      const borders = response.data.map((res) => res.name);
      setborderCountries(borders);
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {detailsCountry && !loading && (
          <Country
            {...detailsCountry}
            borderCountries={borderCountries}
          />
        )}
    </div>
  )
};

export default Description;