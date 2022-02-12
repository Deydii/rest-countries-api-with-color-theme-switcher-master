import { Routes, Route} from 'react-router-dom';
import Header from '../Header';
import SearchBar from '../SearchBar';
import Cards from '../Cards';
import Country from '../Country';

import './style.scss';

const App = () => {

  return (
    <div className="app">
      <Header />
        <Routes>
          <Route 
            path="/"
            element={
            <>
              <SearchBar />
              <Cards />
            </>
          }
          />
          <Route 
            path="/country/:code"
            element={<Country />}
          /> 
        </Routes>
    </div>
  );
}

export default App;
