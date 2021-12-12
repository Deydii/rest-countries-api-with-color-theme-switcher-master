import { useContext } from 'react';
import { Routes, Route} from 'react-router-dom';
import { CountriesContext } from '../../context/countriesContext';
import Header from '../Header';
import SearchBar from '../SearchBar';
import Cards from '../Cards';
import Description from '../Description';

import './style.scss';

const App = () => {

  const { loading } = useContext(CountriesContext);

  return (
    <div className="app">
      <Header />
      {!loading && (
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
            path="/country/:name"
            element={<Description />}
          /> 
        </Routes>
      )}    
    </div>
  );
}

export default App;
