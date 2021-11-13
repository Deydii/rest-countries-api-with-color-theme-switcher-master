import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import Header from '../Header';
import SearchBar from '../SearchBar';
import Cards from '../Cards';

import { useLoadData } from '../../Hooks';
import { Countries } from '../../interfaces/types';

import './style.scss';

const App = () => {
  const [loading, countries] = useLoadData('https://restcountries.com/v2/all');
  const [countriesInfos, setCountriesInfos] = useState<Countries[]>([]);

  const getCountriesInfos = ():void => {
    setCountriesInfos(countries)
  };

  useEffect(() =>{ 
    getCountriesInfos()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  return (
    <div className="app">
      <Header />
      <SearchBar />
        <Routes>
          <Route 
            path="/"
            element={<Cards countriesInfos={countriesInfos} />
           }
          /> 
      </Routes>
    </div>
  );
}

export default App;
