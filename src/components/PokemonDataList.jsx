import { useContext } from 'react'
import { PokemonListContext } from '../context/PokemonListContext'
import _ from "lodash"

const PokemonDataList = () => {
    const { pokemonList, setSelectedGeneration, setSelectedPokemon, setSelectedPokemonData, selectedPokemonIsShiny, setSelectedPokemonIsShiny } = useContext(PokemonListContext)

    const selectPokemonHandler = (e) => {
        const pokemonName = e.target.value
        const pokemonMatch = pokemonList.find((pokemon) => pokemon.name === pokemonName)

        if (pokemonMatch) {
            setSelectedPokemon(pokemonMatch)
            if (selectedPokemonIsShiny) setSelectedPokemonIsShiny(false)
            setSelectedPokemonData({})
        }
    }

    const selectGenHandler = (e) => {
        const selectedGenNumber = e.target.value

        setSelectedGeneration(selectedGenNumber)
    }

    const generations = [
        {
            number: "1",
            endCount: 151
        },
        {
            number: "2",
            endCount: 251
        },
        {
            number: "3",
            endCount: 386
        },
        {
            number: "4",
            endCount: 493
        },
        {
            number: "5",
            endCount: 649
        },
        {
            number: "6",
            endCount: 721
        },
        {
            number: "7",
            endCount: 809   
        },
        {
            number: "8",
            endCount: 905
        },
    ]

    return (
        <div className='flex justify-center'>
            <form >
                <select
                    name="pokemon-list"
                    id="pokemon-list"
                    className='border-[1px] border-[#2a75bb] mt-5 pl-[3px] pr-[30px] rounded-md outline-none'
                    onChange={selectPokemonHandler}>
                    <option hidden disabled selected value>Select a pokemon</option>
                    {pokemonList.map((pokemon, index) => (
                        <option
                            key={index}
                            value={pokemon.name}>{pokemon.name}
                        </option>
                    ))}
                </select>
                <select
                    name="pokemon-generation-list"
                    id="pokemon-generation-list"
                    className='border-[1px] border-[#2a75bb] mt-5 pl-[3px] pr-[5px] rounded-md outline-none ml-1'
                    onChange={selectGenHandler}>
                    {generations.map((generation) => (
                        <option
                            key={generation.number}
                            value={generation.number}>{`${generation.number}º Gen`}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    )
}

export default PokemonDataList