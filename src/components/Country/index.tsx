import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';

import { Countries } from '../../interfaces/types';
import CountriesList from './CountriesList';

import './style.scss';

interface BorderCountries {
  borderCode: string,
  borderName: string
}

const Country = () => {

  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<Countries>();
  const [borderCountries, setBorderCountries] = useState<BorderCountries[]>([]);

  // Get URL params
  const { code } = useParams();

  useEffect(() => {
    setLoading(true);
    // Get country details
    axios
      .get<Countries>(`https://restcountries.com/v2/alpha/${code}`)
      .then(response => {
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
          flags: response.data.flags
        })
        // Get border countries details
        if (response.data.borders) {
          const borderCodes = response.data.borders?.map(border => border);
          const codes = borderCodes?.join(","); 
          axios
          .get<Countries[]>(`https://restcountries.com/v2/alpha?codes=${codes}`)
          .then(response => {
            const borderInfos = response.data.map(res => {
              return ({
                borderCode: res.alpha3Code,
                borderName: res.name
              })
            });
            setBorderCountries(borderInfos);  
          })
          .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [code]);

  const getCurrencies = ():string | undefined => {
    const countryCurrencies = country?.currencies?.map(currency => currency.name);
    return countryCurrencies?.join(", ");
  }

  const getCountryLanguages = ():string | undefined => {
    const countryLanguages = country?.languages.map(language => language.name);
    return countryLanguages?.join(", ");
  };

  const getBorderCountries = borderCountries?.map(border => {
    return (
      <CountriesList
        key={border.borderCode}
        borderCode={border.borderCode}
        borderName={border.borderName}
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
            <p><span>Currencies: </span>{getCurrencies()}</p>
            <p><span>Languages: </span>{getCountryLanguages()}</p>
          </div> 
          </div>
          <div className="country__details--list">
            <div>
              <p><span>Border Countries: </span></p>
            </div>
          <div>
            {borderCountries.length > 0 ? getBorderCountries : <p>{country.name} has no border countries</p>}
          </div>
        </div>
      </div>
    </div>
    )}
    </div>
  )
};

export default Country;