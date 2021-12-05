import Card from './Card';
import { Countries } from '../../interfaces/types';

import './style.scss';

interface allCountries {
  countriesInfos: Countries[],
}

const Cards = ({ countriesInfos } : allCountries) => {
  return (
    <div className="cards"> 
      {countriesInfos.map(({
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
          />
       )
      })}
    </div>
  );
};

export default Cards;