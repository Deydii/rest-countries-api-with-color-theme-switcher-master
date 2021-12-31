import { Link } from 'react-router-dom';

interface Border {
  countryName: string
}

const CountriesList = ({ countryName }: Border) => {

  return(
    <>
      <Link to={`/country/${countryName}`}>
        <button 
          className="country__details--button"
          type="button"
        >
          {countryName}
        </button>
      </Link>
    </>
  );
};

export default CountriesList;