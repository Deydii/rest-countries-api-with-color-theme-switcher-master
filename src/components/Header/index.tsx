import { Link } from 'react-router-dom';
import { HiOutlineMoon } from 'react-icons/hi';

import './style.scss';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <div>
          <h2 className="header__title">Where in the world?</h2>
        </div>
      </Link>
      <div className="header__mode">
        <HiOutlineMoon />
        <button 
          className="header__button"
          type="button"
        >
          Dark Mode
        </button>
      </div>
    </header>
  );
};

export default Header;