import { Link } from 'react-router-dom';
import { Countries } from '../../../interfaces/types';

interface Border {
  countries: Countries[],
  name: string
}

const CountriesList = ({ name, countries }: Border) => {
  const border = countries.find(country => country.alpha3Code === name)
  
  return(
    <Link to={`/country/${border?.name}`}>
      <button className="country__details--button">{border?.name}</button>
    </Link>
  );
};

export default CountriesList;