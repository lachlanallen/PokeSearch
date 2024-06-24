import React from "react";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import './css/SearchBar.css';

function About({ inputSearch, setInputSearch, pokemonsData }) {
  let { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    if (pokemonId) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data);
          console.log(data);
        })
    }
  }, [pokemonId]);

  return (
    <>
      <SearchBar
        isSearchBarInNavbar={true}
        searchTerm={inputSearch}
        onSearchChange={(e) => setInputSearch(e.target.value)}
        pokemonsData={pokemonsData}
      />
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </>
  );
}

export default About;