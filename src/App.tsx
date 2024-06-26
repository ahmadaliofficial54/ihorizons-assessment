// src/App.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; import { setPokemonList, setSelectedPokemon } from './store/slices/pokemonSlice';
import { AppDispatch, RootState } from './store';
import { useGetPokemonListQuery } from './services/pokemonAPI';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import './App.css';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedPokemon = useSelector((state: RootState) => state.pokemon.selectedPokemon);
  const { data, error, isLoading } = useGetPokemonListQuery();

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
        dispatch(setPokemonList(results));
      };
      fetchPokemonDetails();
    }
  }, [data, dispatch]);

  const handlePokemonClick = (id: string) => {
    dispatch(setSelectedPokemon(id));
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error occurred</div>
  }

  return (
    <div className='container'>
      <PokemonList onPokemonClick={handlePokemonClick} />
      {selectedPokemon && <PokemonDetails />}
    </div>
  )
}

export default App;