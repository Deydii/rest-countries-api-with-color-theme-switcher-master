import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';

import { Countries, BorderCountriesDetails } from '../../interfaces/types'
import Spinner from '../Spinner';
import CountriesList from './CountriesList';

import './style.scss';

const Country = () => {

  // Get URL params
  const { code } = useParams<"code">();

  type CountryInfos = Omit<Countries, 'borders'> & { borders? : BorderCountriesDetails[]} ;

  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<CountryInfos>();

  useEffect(() => {
    setLoading(true);
    // Get country details
    axios.get<Countries>(`https://restcountries.com/v2/alpha/${code}`)
    .then(async response => {
      if (response.data.borders) {
      const borderInfos = response.data.borders.map(border => 
      axios
        .get<BorderCountriesDetails>(`https://restcountries.com/v2/alpha/${border}?fields=alpha3Code,name`)
        .then(response => response.data)
      );

      const borders = await Promise.all(borderInfos);
            
      return setCountry({
        name: response.data.name,
        topLevelDomain: response.data.topLevelDomain,
        alpha3Code: response.data.alpha3Code,
        capital: response.data.capital,
        subregion: response.data.subregion,
        region: response.data.region,
        population: response.data.population,
        nativeName: response.data.nativeName,
        currencies: response.data.currencies,
        languages: response.data.languages,
        flags: response.data.flags,
        borders: borders
      });
      }
      setCountry({
        name: response.data.name,
        topLevelDomain: response.data.topLevelDomain,
        alpha3Code: response.data.alpha3Code,
        capital: response.data.capital,
        subregion: response.data.subregion,
        region: response.data.region,
        population: response.data.population,
        nativeName: response.data.nativeName,
        currencies: response.data.currencies,
        languages: response.data.languages,
        flags: response.data.flags,
      })
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false));

  }, [code]);

    const getBorderCountries = country?.borders?.map(border => {
      return (
        <CountriesList
          key={border.alpha3Code}
          borderCode={border.alpha3Code}
          borderName={border.name}
        />
      );
    })

  return(
      <div className="country">
        <Link to="/">
          <button
            className="country__button"
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
      {loading && <Spinner />}
      {!loading && country && (
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
            {country.borders && country.borders.length > 0 ? getBorderCountries : <p>{country.name} has no border countries</p>}
          </div>
        </div>
      </div>
    </div>
    )}
    </div>
  )
};

export default Country;