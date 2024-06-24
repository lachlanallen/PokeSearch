import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home({ pokemonProp: results }) {
  console.log(results);
  return (
    <div className="home">
      <h2 className="title">Generation 7</h2>
      <div className="container">
        {results && results.length > 0 ? (
          results.map((val, index) => (
            <div className="pokemon-preview" key={index}>
              <Link to={`/about/${val.index}`}>
                <div className="pokemon-text">
                  0{val.index} {val.name.charAt(0).toUpperCase()}{val.name.slice(1)}
                </div>
                <div className="pokemon-image">
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${val.index}.png`} alt={val.name} />
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="error">No results found.</p>
        )}
      </div>
    </div>
  )
}

export default Home;