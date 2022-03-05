import { useContext } from 'react';
import Card from './Card';
import { CountriesContext } from '../../context/countriesContext';
import SkeletonCard from '../Skeleton';

import './style.scss';

const Cards = () => {

  const { countries, loading, error, country } = useContext(CountriesContext);

  const skeletonArray = Array.from({length: 4}, (value, index) => {
    return <SkeletonCard key={index} />
  });
  
  return (
    <div className={loading ? "cards cards__skeleton" : "cards"}>
    {loading && <> {skeletonArray} </> }
    {!loading && error && <p className="cards__error">No results found...</p>}
    {!loading && !error && !country.length ? (
      <>
        {countries.map(
          ({
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
    ) : (
      <>
      {country.map(
        ({
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
        )}
      )}
      </>
     )}
    </div>
  );
};

export default Cards;