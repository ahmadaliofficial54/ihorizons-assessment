import React from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import { useAppSelector } from './hooks';
import PokemonDetails from './components/PokemonDetails';

function App() {
  const selectedPokemon = useAppSelector((state) => state.pokemon.selectedPokemon);

  return (
    <div className='container'>
      <PokemonList />
      {selectedPokemon && <PokemonDetails />}
    </div>
  );
}

export default App;
