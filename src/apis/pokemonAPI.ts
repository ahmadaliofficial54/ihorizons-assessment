import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || 'https://pokeapi.co/api/v2/';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<{ results: { name: string, url: string }[] }, void>({
      query: () => 'pokemon/',
    }),
    getPokemonDetails: builder.query<any, string>({
      query: (id) => `pokemon/${id}/`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
