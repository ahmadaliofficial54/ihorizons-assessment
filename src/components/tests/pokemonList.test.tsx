import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import PokemonList from '../PokemonList';
import { server } from '../../mocks/server';
import { rest } from 'msw';

server.use(
  rest.get('https://pokeapi.co/api/v2/pokemon/', (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        ],
      })
    );
  })
);

test('renders list of Pokémon', async () => {
  render(
    <Provider store={store}>
      <PokemonList />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByText('venusaur')).toBeInTheDocument();
  });
});
