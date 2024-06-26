import { setupServer } from 'msw/node';
import { rest } from 'msw';


export const server = setupServer(
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
    }),
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
            })
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
