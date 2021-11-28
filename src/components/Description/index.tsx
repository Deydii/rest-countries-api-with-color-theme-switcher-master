import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';
import Country from './Country';

import './style.scss';

const Description = () => {
  return(
    <div className="description">
      <Link to="/">
        <button
          className="description__button"
          type="button"
        >
          <IconContext.Provider value={{
            className: "description__button--icon"
          }}>
              <HiArrowNarrowLeft />
          </IconContext.Provider>
          <span>
            Back
          </span>
        </button>
      </Link>
      <Country />
    </div>
  )
};

export default Description;