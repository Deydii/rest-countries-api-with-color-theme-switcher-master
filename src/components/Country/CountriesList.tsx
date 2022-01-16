import { Link } from 'react-router-dom';

interface Border {
  borderCode: string,
  borderName: string
}

const CountriesList = ({ borderCode, borderName }: Border) => {

  return(
    <>
      <Link to={`/country/${borderCode}`}>
        <button 
          className="country__details--button"
          type="button"
        >
          {borderName}
        </button>
      </Link>
    </>
  );
};

export default CountriesList;