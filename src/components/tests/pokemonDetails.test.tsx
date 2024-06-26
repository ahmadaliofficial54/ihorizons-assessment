import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import PokemonDetails from '../PokemonDetails';
import { setSelectedPokemon } from '../../features/pokemonSlice';
import { server } from '../../mocks/server';
import { rest } from 'msw';

server.use(
    rest.get('https://pokeapi.co/api/v2/pokemon/:id', (req, res, ctx) => {
        return res(
            ctx.json({
                name: 'bulbasaur',
                height: 7,
                weight: 69,
                base_experience: 64,
                sprites: {
                    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                },
                types: [{
                    type: {
                        name: "grass"
                    }
                }
                ]
            })
        );
    })
);

test('renders details of selected pokemon', async () => {
    store.dispatch(setSelectedPokemon('1'));

    render(
        <Provider store={store}>
            <PokemonDetails />
        </Provider>
    );

    await waitFor(() => {
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('70 cm')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('6.9 kg')).toBeInTheDocument();
    });
});
