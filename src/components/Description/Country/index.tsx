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
  currencies?: Countries["currencies"],
  languages: Countries["languages"],
  borderCountries?: Countries["borders"]
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
  borderCountries,
}: SelectedCountryInfos) => {


  const getCurrencies = ():string | undefined => {
    if (currencies) {
      const countryCurrencies = currencies.map(currency => currency.name)
      return countryCurrencies.join(", ");
    }
  }

  const getCountryLanguages = ():string => {
    const countryLanguages = languages.map(language => language.name);
    return countryLanguages.join(", ");
  };

  const getBorderCountries = borderCountries?.map(border => {
    return (
      <CountriesList
        key={border}
        countryName={border}
      />
    );
  })

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
            <p><span>Languages: </span>{getCountryLanguages()}</p>
          </div> 
        </div>
        <div className="country__details--list">
          <div>
            <p><span>Border Countries: </span></p>
          </div>
          <div>
            {borderCountries && borderCountries.length > 0 ? getBorderCountries : <p>{name} has no border countries</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;