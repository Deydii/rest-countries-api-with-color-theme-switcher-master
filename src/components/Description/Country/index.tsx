import CountriesList from './CountriesList';
import { Countries } from '../../../interfaces/types';

import './style.scss';

interface SelectedCountryInfos {
  flags: Countries["flags"],
  name: Countries["name"]
  nativeName: Countries["nativeName"],
  population: Countries["population"]
  region: Countries["region"],
  subregion: Countries["subregion"],
  capital: Countries["capital"],
  topLevelDomain: Countries["topLevelDomain"],
  currencies: Countries["currencies"],
  languages: Countries["languages"],
  borders: Countries["borders"]
}

const Country = ({
  flags,
  name,
  nativeName,
  population,
  region,
  subregion,
  capital,
  topLevelDomain,
  currencies,
  languages,
  borders
}: SelectedCountryInfos) => {


  const getCurrencies = ():string => {
    const currenciesCountry = currencies.map(currency => currency.name)
    return currenciesCountry.join(", ");
  }

  const getLanguagesCountry = ():string => {
    const languagesCountry = languages.map(language => language.name);
    return languagesCountry.join(", ");
  };

  return(
    <div className="country">
      <div className="country__flag">
        <img 
          src={flags.svg} alt="flag country" />
      </div>
      <div className="country__details">
        <h3 className="country__details--title">{name}</h3>
        <div className="country__details--elements">
          <div>
            <p><span>Native Name: </span>{nativeName}</p>
            <p><span>Population: </span>{population.toLocaleString("en-US")}</p>
            <p><span>Region: </span>{region}</p>
            <p><span>Sub Region: </span>{subregion}</p>
            <p><span>Capital: </span>{capital}</p>
          </div>
          <div>
           <p><span>Top Level Domain: </span>{topLevelDomain}</p>
           <p><span>Currencies: </span>{getCurrencies()}</p>
            <p><span>Languages: </span>{getLanguagesCountry()}</p>
          </div> 
        </div>
        <div className="country__details--list">
          <div>
            <p><span>Border Countries: </span></p>
          </div>
          {borders ? (
            <div>
              {borders.map(border => {
                return (
                  <CountriesList 
                    key={border}
                    name={border}
                  />
                )
              })}
            </div>
            )
            : 
            <p>{name} has no border countries</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Country;