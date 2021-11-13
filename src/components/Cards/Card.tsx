import { Countries } from '../../interfaces/types';

interface country {
  name: Countries["name"],
  flags: Countries["flags"]
  population: Countries["population"],
  region: Countries["region"],
  capital: Countries["capital"]
}

const Card = ({ 
  name,
  flags,
  population,
  region,
  capital
}: country) => {
  return (
    <div className="cards__infos">
      <div className="cards__flag">
        <img src={flags.png} alt=""/>
      </div>
      <div className="cards__content">
        <h3 className="cards__content--title">{name}</h3>
        <div className="cards__content--details">
           <p><span>Population: </span>{population.toLocaleString("en-US")}</p>
           <p><span>Region: </span>{region}</p>
           <p><span>Capital: </span>{capital}</p>
        </div>
      </div>
    </div>
  );
};


export default Card;