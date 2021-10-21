
const Card = () => {
  return (
    <div className="cards__infos">
      <div className="cards__flag">
        {/* <img src={} alt=""/> */}
      </div>
      <div className="cards__content">
        <h3 className="cards__content--title">Country</h3>
        <div className="cards__content--details">
           <p><span>Population:</span></p>
           <p><span>Region:</span></p>
           <p><span>Capital:</span></p>
        </div>
      </div>
    </div>
  );
};

export default Card;