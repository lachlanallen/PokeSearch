import './App.css';
import About from './About'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import Home from './Home'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import TitleSection from './components/TitleSection';
import PokemonList from './PokemonList';

function App() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [inputSearch, setInputSearch] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/generation/7?offset=0&limit=100')
      .then(res => res.json())
      .then((data) => {
        const pokemon_species = data.pokemon_species.map((pokemonDetails, index) => {
          const url = pokemonDetails.url;
          index = parseInt(url.split('/').slice(-2, -1)[0]);
          return { ...pokemonDetails, index };
        });
        setPokemonsData({ ...data, pokemon_species });
      })

  }, []);

  useEffect(() => {
    if (!inputSearch || typeof inputSearch !== 'string') {
      setFilteredPokemon(pokemonsData.pokemon_species);
      return;
    }
  
    setFilteredPokemon(() =>
      pokemonsData.pokemon_species?.filter((pokemon) =>
        pokemon.name.includes(inputSearch.toLowerCase())
      )
    );
  }, [pokemonsData.pokemon_species, inputSearch]);  

  

  return (
    <BrowserRouter>
      <Navbar />
      <TitleSection setInputSearch={setInputSearch} />

      <Routes>
        <Route path="/pokemon-list" element={<PokemonList inputSearch={inputSearch} setInputSearch={setInputSearch} pokemonsData={pokemonsData} />} />
        <Route path="/about/:pokemonId" element={<About inputSearch={inputSearch} setInputSearch={setInputSearch} pokemonsData={pokemonsData} />} />
        <Route path="/about/:pokemonId" element={<About />} />
        <Route path="/pokemon-list" element={<PokemonList />} />
        {filteredPokemon &&
          <Route path="/" element={<Home pokemonProp={filteredPokemon} />} />
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;