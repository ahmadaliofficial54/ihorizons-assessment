import React, { useEffect, useState } from 'react';
import { useGetPokemonListQuery } from '../apis/pokemonAPI';
import { useAppDispatch } from '../hooks';
import { setSelectedPokemon } from '../features/pokemonSlice';

interface Pokemon {
  name: string;
  imageUrl: string;
}

const PokemonList: React.FC = () => {
  const { data, error, isLoading } = useGetPokemonListQuery();
  const dispatch = useAppDispatch();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (data) {
      const fetchPokemonDetails = async () => {
        const promises = data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const details = await response.json();
          return {
            name: pokemon.name,
            imageUrl: details.sprites.front_default,
          };
        });
        const results = await Promise.all(promises);
        setPokemonList(results);
      };
      fetchPokemonDetails();
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <ul className='pokemonlist'>
      <div className='header'>
        <p className='header__title'>PokeReact</p>
      </div>
      {pokemonList.map((pokemon) => (
        <li key={pokemon.name} onClick={() => dispatch(setSelectedPokemon(pokemon.name))} className='pokemonlist__item'>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          <span>{pokemon.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
