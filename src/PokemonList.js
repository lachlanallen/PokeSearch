import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PokemonList.css';
import SearchBar from './components/SearchBar';
import './css/SearchBar.css';

function PokemonList({ inputSearch, setInputSearch, pokemonsData }) {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/generation/7?offset=0&limit=100')
      .then(res => res.json())
      .then((data) => {
        const pokemon_species = data.pokemon_species.map((pokemonDetails, index) => {
          const url = pokemonDetails.url;
          index = parseInt(url.split('/').slice(-2, -1)[0]);
          return { ...pokemonDetails, index };
        });
        const sortedData = pokemon_species.sort((a, b) => a.name.localeCompare(b.name));
        setPokemonData(sortedData);
      });
  }, []);

  const groupedData = pokemonData.reduce((grouped, pokemon) => {
    const firstLetter = pokemon.name.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(pokemon);
    return grouped;
  }, {});

  return (
    <div>
      <SearchBar
        isSearchBarInNavbar={true}
        searchTerm={inputSearch}
        onSearchChange={(e) => setInputSearch(e.target.value)}
        pokemonsData={pokemonsData}
      />

      <div className="list-container">
        {Object.entries(groupedData).map(([letter, pokemons]) => (
          <div key={letter}>
            <p className="letter">{letter}</p>
            <hr />
            {pokemons.map((val, index) => (
              <Link to={`/about/${val.index}`} key={index}>
                <div className="pokemonList-preview">
                  <div className="pokemon-text">
                    0{val.index} {val.name.charAt(0).toUpperCase()}{val.name.slice(1)}
                  </div>
                  <div className="pokemon-image">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${val.index}.png`} alt={val.name} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>

  );
}

export default PokemonList;