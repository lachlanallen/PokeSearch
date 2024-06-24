import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/PokemonCard.css';

/* Background Gradients */
const typeColors = {
  grass: 'linear-gradient(#2ACA27, #C6FD9B)',
  fire: 'linear-gradient(#FF4B4B, #FFA800)',
  water: 'linear-gradient(#64C7FF, #C6F5FF)',
  normal: 'linear-gradient(#D9D9D9, #F5F5F5)',
  electric: 'linear-gradient(#FFCD00, #FFF2BC)',
  fighting: 'linear-gradient(#C70606, #FF4B4B)',
  poison: 'linear-gradient(#A13CD1, #E0A0FF)',
  ground: 'linear-gradient(#C95717, #FF764A)',
  psychic: 'linear-gradient(#D70034, #FF498B)',
  fairy: 'linear-gradient(#FF80CC, #FFC3E7)',
  bug: 'linear-gradient(#ADDB29, #DCF790)',
  rock: 'linear-gradient(#BDAC98, #EEE3D5)',
  ghost: 'linear-gradient(#641AAE, #677CEA)',
  dragon: 'linear-gradient(#A496CA, #E8E8F5)',
  dark: 'linear-gradient(#191139, #61518D)',
  steel: 'linear-gradient(#B2C9D7, #EFF4F5)'
};

/* Pokemon Names */
const typeTextColors = {
  fighting: '#FFFFFF',
  ground: '#FFFFFF',
  psychic: '#FFFFFF',
  ghost: '#FFFFFF',
  dark: '#FFFFFF'
};

/* Pokemon Type Buttons */
const typeButtonColors = {
  grass: '#16B413',
  fire: '#FF1F1F',
  water: '#188CE4',
  normal: '#B1B1B1',
  electric: '#FFA234',
  fighting: '#B10808',
  poison: '#8545A4',
  ground: '#D94517',
  psychic: '#C71243',
  fairy: '#FF57BC',
  bug: '#8CB517',
  rock: '#BCA78C',
  ghost: '#4C22AA',
  dragon: '#9F93D1',
  dark: '#2B2053',
  steel: '#809EAE',
  flying: '#EBD4F6',
  ice: '#9CE3E3'
};

const typeButtonTextColors = {
  flying: '#8545A4',
  ice: '#188CE4'
};

function PokemonCard({ pokemon }) {

  const [flavorText, setFlavorText] = useState('');
  const [genus, setGenus] = useState('');

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
      .then(response => response.json())
      .then(data => {
        const englishFlavorText = data.flavor_text_entries.find(entry => entry.language.name === 'en');
        if (englishFlavorText) {
          setFlavorText(englishFlavorText.flavor_text);
        }

        const englishGenus = data.genera.find(gen => gen.language.name === 'en');
        if (englishGenus) {
          setGenus(englishGenus.genus);
        }
      });
  }, [pokemon.id]);
  
  let pokemonType = '';
  if (pokemon && pokemon.types[0]) {
    pokemonType = pokemon.types[0].type.name;
  }

  const headerStyle = {
    background: typeColors[pokemonType] || '#FFFFFF'
  };

  const nameStyle = {
    color: typeTextColors[pokemonType] || '#000000' // Default color is black
  };

  return (
    <>
      {pokemon && (
        <div className="pokemon-card">
          <div className="header" style={headerStyle}>
            <h3 className="pokemon-name" style={nameStyle}>{pokemon.pokemon_species}</h3>
            <h2 className="pokemon-name" style={nameStyle}>#0{pokemon.id} {pokemon.name.charAt(0).toUpperCase()}{pokemon.name.slice(1)}</h2>
            <div>
              {pokemon.types.map((t, index) => {
                const typeStyle = {
                  backgroundColor: typeButtonColors[t.type.name] || '#FFFFFF',
                  color: typeButtonTextColors[t.type.name] || '#FFFFFF',
                  textTransform: 'uppercase'
                };
                return (
                  <p className="pokemon-type" key={index} style={typeStyle}>{t.type.name}</p>
                );
              })}
            </div>
            <div className="circle-large1" style={{ backgroundColor: typeButtonColors[pokemon.types[0].type.name] }}></div>
            <div className="circle-large2" style={{ backgroundColor: typeButtonColors[pokemon.types[0].type.name] }}></div>
            <div className="circle-small1" style={{ backgroundColor: typeButtonColors[pokemon.types[0].type.name] }}></div>
            <div className="circle-small2" style={{ backgroundColor: typeButtonColors[pokemon.types[0].type.name] }}></div>
            <div className='flex justify-center'>
              <img className="pokemon-photo" src={pokemon.sprites.other["official-artwork"].front_default} alt=""></img>
            </div>

            <div class="custom-shape-divider-bottom-1707850064">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
              </svg>
            </div>
          </div>
          <div className="stats-pokedex-container">
            <div>
              <p className="pokemon-genus">The {genus}</p>
              <p className="flavor-text">{flavorText}</p>
            </div>
            <div className="stats">
              {pokemon.stats.map((stat, index) => {
                return (
                  <p key={index}>
                    {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="navigation-buttons">
            <Link to="/" className="home-button">Back to Home</Link>
            <Link to="/pokemon-list" className="list-button">Pokemon List</Link>
          </div>
        </div>
      )}
    </>
  );
}


export default PokemonCard;
