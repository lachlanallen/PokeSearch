import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/SearchBar.css';

function SearchBar({ isSearchBarInNavbar, searchTerm, onSearchChange, pokemonsData = {} }) {
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    if (!searchTerm || typeof searchTerm !== 'string') {
      setFilteredPokemons(pokemonsData.pokemon_species || []);
      return;
    }
  
    setFilteredPokemons(() =>
      pokemonsData.pokemon_species?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [pokemonsData.pokemon_species, searchTerm]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleSearchBarClick = () => {
    setShowSearchResults(true);
    // Populate search results with all available options
    setFilteredPokemons(pokemonsData.pokemon_species || []);
  };

  const handleResultClick = () => {
    setShowSearchResults(false);
    onSearchChange({ target: { value: '' } }); // Clearing the search bar input
  };

  const handleInputChange = (event) => {
    setShowSearchResults(true);
    onSearchChange(event);
  };

  return (
    <div>
      {isSearchBarInNavbar ? (
        <div className="navbar-search-bar">
          <i className="bi-search"></i>
          <input
            className="search-input"
            placeholder="Search for Pokemon..."
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onClick={handleSearchBarClick}
          />
          {showSearchResults && searchTerm && (
            <div ref={searchResultsRef} className="search-results">
              {filteredPokemons.map(pokemon => (
                <Link key={pokemon.index} to={`/about/${pokemon.index}`} onClick={handleResultClick}>
                  {pokemon.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="search-bar">
          <i className="bi-search"></i>
          <input
            className="search-input"
            placeholder="Search for Pokemon..."
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
      )}
      <div className="custom-shape-divider-bottom-1707675389">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default SearchBar;
