import Header from '../Header';
import SearchBar from '../SearchBar';
import Cards from '../Cards';

import './style.scss';

const App = () => {
  return (
    <div className="app">
      <Header />
      <SearchBar />
      <Cards />
    </div>
  );
}

export default App;
