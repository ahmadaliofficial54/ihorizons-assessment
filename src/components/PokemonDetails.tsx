import React from 'react';
import { useAppSelector } from '../hooks';
import { useGetPokemonDetailsQuery } from '../apis/pokemonAPI';
import { pokemonType } from '../types';



const PokemonDetails: React.FC = () => {
    const selectedPokemon = useAppSelector((state) => state.pokemon.selectedPokemon);
    const { data, error, isLoading } = useGetPokemonDetailsQuery(selectedPokemon || '', {
        skip: !selectedPokemon,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred</div>;

    return (
        <div className='pokemondetails'>
            <div className='header'>
                <p className='header__title'>{selectedPokemon}</p>
            </div>
            <div className='pokemondetails__sprite'>
                <img src={data.sprites.front_default} alt={data.name} />
            </div>

            <div className='pokemondetails__info'>
                <p className='pokemondetails__info__heading'>Name</p>
                <p>{data.name}</p>
            </div>
            <div className='pokemondetails__info'>
                <p className='pokemondetails__info__heading'>Height</p>
                <p>{data.height * 10} cm</p>
            </div>
            <div className='pokemondetails__info'>
                <p className='pokemondetails__info__heading'>Weight</p>
                <p>{data.weight / 10} kg</p>
            </div>
            <div className='pokemondetails__info'>
                <p className='pokemondetails__info__heading'>Types</p>
                <div>
                    {data.types.map((type: pokemonType) => <p key={type.type.name}>{type.type.name}</p>)}
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;
