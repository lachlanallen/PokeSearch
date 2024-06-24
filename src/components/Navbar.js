import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';
import '../css/SearchBar.css';
import SearchBar from './SearchBar';

function Navbar() {
  const [isSearchBarInNavbar, setIsSearchBarInNavbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSearchBarInNavbar(location.pathname !== '/');
  }, [location]);

  return (
    <div className="navbar">
      <div className="navbar-title">
        <img className="pokeball" src={process.env.PUBLIC_URL + '/pokeBall.png'} alt="pokeball"></img>
        <Link to="/">
          <h1>PokeSearch</h1>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link className="pokemon-list-button" to="/pokemon-list">Pokemon List</Link>
      </div>
      
    </div>
  );
}

export default Navbar;