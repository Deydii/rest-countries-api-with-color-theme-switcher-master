import { useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import { getCountryData, getBorders } from '../Api';
import { Link, useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';
import { getData } from '../../Hooks';
import { Countries } from '../../interfaces/types'
import Spinner from '../Spinner';
import CountriesList from './CountriesList';

import './style.scss';

const Country = () => {

  const { theme } = useContext(ThemeContext);

  // Get URL params
  const { code } = useParams<"code">();

  const [country, setCountry] = useState<Countries>();

  const { isLoading, isError, data, refetch } = useQuery<Countries>('countryInfos', () => getCountryData(`https://restcountries.com/v2/alpha/${code}`));

  useEffect(() => {
    if (data) {
      const dataCountry = getData(data);
      setCountry(dataCountry);
      refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, code]);

  const bordersCountry: string = country?.borders?.toString() || "";

  const { isLoading: loading, data: borders, refetch: refetchBorders } = useQuery<Countries[]>('borders', () => getBorders(`https://restcountries.com/v2/alpha?codes=${bordersCountry}`),
    {
      enabled: !!country?.borders
    }
  );

  const getBordersCountry = borders?.map(bordersInfos => {
    return (
       <CountriesList
         key={bordersInfos?.alpha3Code}
         borderCode={bordersInfos?.alpha3Code}
         borderName={bordersInfos?.name}
       />
     );
  });

  useEffect(() => {
    if (country?.borders) {
      refetchBorders()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country?.borders])

  return(
      <div className="country">
        <Link to="/">
          <button
            className={theme === "dark" ? "country__button country__button--dark" : "country__button"}
            type="button"
          >
            <IconContext.Provider value={{
              className: "country__button--icon"
            }}>
                <HiArrowNarrowLeft />
            </IconContext.Provider>
            <span>
              Back
            </span>
          </button>
        </Link>
        {isLoading && <Spinner />}
        {!isLoading && isError && <p className="country__error">The request unfortunately failed. Please try later.</p>}
        {!isLoading && !loading && country && (
        <div className="country__section">
          <div className="country__flag">
            <img src={country.flags.svg} alt="flag country" />
          </div>
          <div className="country__details">
            <h3 className="country__details--title">{country.name}</h3>
            <div className="country__details--elements">
          <div>
          <p><span>Native Name: </span>{country.nativeName}</p>
          <p><span>Population: </span>{country.population.toLocaleString("en-US")}</p>
          <p><span>Region: </span>{country.region}</p>
          <p><span>Sub Region: </span>{country.subregion}</p>
          <p><span>Capital: </span>{country.capital}</p>
          </div>
          <div>
            <p><span>Top Level Domain: </span>{country.topLevelDomain}</p>
            <p><span>Currencies: </span>{country.currencies?.map(currency => currency.name).join(', ')}</p>
            <p><span>Languages: </span>{country.languages.map(language => language.name).join(', ')}</p>
          </div> 
          </div>
          <div className="country__details--list">
            <div>
              <p><span>Border Countries: </span></p>
            </div>
          <div>
        {country.borders && country.borders.length > 0 ? getBordersCountry : <p>{country?.name} has no border countries</p>}
        </div>
        </div>
      </div>
      </div>
     )}
    </div>
  )
};

export default Country;