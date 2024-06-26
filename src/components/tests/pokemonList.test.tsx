// src/features/__tests__/PokemonList.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PokemonList from '../PokemonList';

const mockStore = configureStore([]);

describe('PokemonList component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      pokemon: {
        pokemonList: [
          { id: 1, name: 'Bulbasaur' },
          { id: 2, name: 'Charmander' },
          { id: 3, name: 'Squirtle' },
        ],
      },
    });
  });

  test('renders list of pokemons from store', () => {
    render(
      <Provider store={store}>
        <PokemonList onPokemonClick={() => { }} />
      </Provider>
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Squirtle')).toBeInTheDocument();
  });

  test('renders "No Pokemon found" when list is empty', () => {
    store = mockStore({
      pokemon: {
        pokemonList: [],
      },
    });

    render(
      <Provider store={store}>
        <PokemonList onPokemonClick={() => {}} />
      </Provider>
    );

    expect(screen.getByText('No Pokemon found')).toBeInTheDocument();
  });

  test('dispatches setSelectedPokemonId action on click', () => {
    const onPokemonClick = jest.fn();

    render(
      <Provider store={store}>
        <PokemonList onPokemonClick={onPokemonClick} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Bulbasaur'));
    expect(onPokemonClick).toHaveBeenCalledTimes(1);
  });
});
