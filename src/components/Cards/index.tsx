import { useContext } from 'react';
import Card from './Card';
import { CountriesContext } from '../../context/countriesContext';

import './style.scss';

const Cards = () => {

  const { countries, loading } = useContext(CountriesContext);

  return (
    <div className="cards">
      {!loading && ( 
        <>
          {countries.map(({
            alpha3Code,
            name,
            flags,
            population,
            region,
            capital
          }) => {
          return (
            <Card
              key={alpha3Code}
              name={name}
              flags={flags}
              population={population}
              region={region}
              capital={capital}
              alpha3Code={alpha3Code}
            />
          )
          })}
       </>
      )}
    </div>
  );
};

export default Cards;