import React from 'react';
import { useAppSelector } from '../hooks';
import { Pokemon } from '../types';

interface PokemonListProps {
  onPokemonClick: (name: string) => void
}

const PokemonList: React.FC<PokemonListProps> = ({ onPokemonClick }) => {
  const pokemonList = useAppSelector(state => state.pokemon.pokemonList)

  if (pokemonList.length === 0) return <span>No Pokemon found</span>;

  return (
    <ul className='pokemonlist'>
      <div className='header'>
        <p className='header__title'>PokeReact</p>
      </div>
      {pokemonList.map((pokemon: Pokemon) => (
        <li key={pokemon.name} onClick={() => onPokemonClick(pokemon.name)} className='pokemonlist__item'>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          <span>{pokemon.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
