import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../types';

interface PokemonState {
  selectedPokemon: string | null;
  pokemonList: Pokemon[]
}

const initialState: PokemonState = {
  selectedPokemon: null,
  pokemonList: []
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSelectedPokemon(state, action: PayloadAction<string | null>) {
      state.selectedPokemon = action.payload;
    },
    setPokemonList(state, action: PayloadAction<any []>) {
      state.pokemonList = action.payload
    }
  },
});

export const { setSelectedPokemon, setPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;
