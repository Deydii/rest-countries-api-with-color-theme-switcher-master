import { useContext } from 'react';
import { CountriesContext } from '../../../context/countriesContext';
import { Link } from 'react-router-dom';

interface Border {
  name: string
}

const CountriesList = ({ name }: Border) => {

  const { countries } = useContext(CountriesContext);

  const border = countries.find(country => country.alpha3Code === name)
  
  return(
    <>
      {border && (
        <Link to={`/country/${border.name}`}>
          <button className="country__details--button">{border.name}</button>
        </Link>
      )}
    </>
  );
};

export default CountriesList;