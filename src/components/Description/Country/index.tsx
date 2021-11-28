import CountriesList from './CountriesList';

import './style.scss';

const Country = () => {
  return(
    <div className="country">
      <div className="country__flag">
        <img 
          src="https://flagcdn.com/be.svg" alt="flag country" />
      </div>
      <div className="country__details">
        <h3 className="country__details--title">Belgium</h3>
        <div className="country__details--elements">
          <div>
            <p><span>Native Name: </span>Belgie</p>
            <p><span>Population: </span>11,555,997</p>
            <p><span>Region: </span>Europe</p>
            <p><span>Sub Region: </span>Western Europe</p>
            <p><span>Capital: </span>Brussels</p>
          </div>
          <div>
            <p><span>Top Level Domain: </span>.be</p>
            <p><span>Currencies: </span>Euro</p>
            <p><span>Languages: </span>Dutch, French, German</p>
          </div>
        </div>
        <div className="country__details--list">
          <div>
            <p><span>Border Countries: </span></p>
          </div>
            <CountriesList />
        </div>
      </div>
    </div>
  );
};

export default Country;