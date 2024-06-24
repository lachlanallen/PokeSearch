import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/TitleSection.css';
import SearchBar from './SearchBar';

function TitleSection({ setInputSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const hideTitleSection = location.pathname !== '/';

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setInputSearch(event.target.value);
  };

  return (
    <div className={`title-section ${hideTitleSection ? 'hidden' : ''}`}>
      <div className='p-14'>
        <div className='flex flex-col items-center'>
          <img className="pokemon-logo" src={process.env.PUBLIC_URL + '/pokemonLogo.png'} alt="pokemon logo" />
          <Link to="/">
            <header>
              PokeSearch
            </header>
          </Link>
          <SearchBar
            isSearchBarInNavbar={false}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
}

export default TitleSection;