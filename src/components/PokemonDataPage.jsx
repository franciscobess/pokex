import _ from "lodash"
import { useContext, useState } from "react"
import { PokemonListContext } from "../context/PokemonListContext"
import axios from 'axios'
import PokemonTypeCard from "./PokemonTypeCard"
import PokemonMoves from "./PokemonMoves"
import Stats from "./Stats"
import { BsStars } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const PokemonDataPage = () => {
    const { selectedPokemon,
        setSelectedPokemonData,
        selectedPokemonData,
        myParty, setMyParty,
        setAlertModalVisibility,
        setAlertModalText,
        toStartCaseString,
        selectedPokemonIsShiny,
        setSelectedPokemonIsShiny,
    } = useContext(PokemonListContext)
    const API_BASE_URL = "https://pokeapi.co/api/v2"

    const hasPokemonDataAvailable = () => {
        return !_.isEmpty(selectedPokemon) && !_.isEmpty(selectedPokemonData) && selectedPokemonData.sprites !== undefined
    }

    const addSelectedPokemonToParty = () => {
        const is_shiny = selectedPokemonIsShiny

        if (!selectedPokemonData.is_shiny) {
            setSelectedPokemonData(selectedPokemonData => ({
                ...selectedPokemonData, is_shiny
            }))
        }

        if (myParty.length <= 5) {
            setMyParty(myParty.concat(selectedPokemonData))
        } else {
            setAlertModalVisibility(true)
            setAlertModalText("Cant have more than six pokemon on your party, buddy. Remove some pokemon of your team and try again.")
        }
    }

    const selectNextPokemon = () => {
        const currentPokemonId = selectedPokemonData.id

        axios.get(`${API_BASE_URL}/pokemon-species/${currentPokemonId + 1}`)
            .then((response) => {
                setSelectedPokemonData(response.data)
            }).catch((err) => {
                console.error(`Erro fetching ${selectedPokemon.name} data: ${err}`)
            })

        setSelectedPokemonIsShiny(false)
    }

    const selectPreviousPokemon = () => {
        const currentPokemonId = selectedPokemonData.id

        axios.get(`${API_BASE_URL}/pokemon-species/${currentPokemonId - 1}`)
            .then((response) => {
                setSelectedPokemonData(response.data)
            }).catch((err) => {
                console.error(`Erro fetching ${selectedPokemon.name} data: ${err}`)
            })

        setSelectedPokemonIsShiny(false)
    }

    if (hasPokemonDataAvailable()) {
        return (
            <div className="flex justify-center items-center">
                <div className="mt-5">
                    <h1 className="text-center text-3xl font-light">{selectedPokemonData.id} - {toStartCaseString(selectedPokemonData.name)}</h1>
                    <div className="z-0 bg-[#dedede] w-[300px] h-[300px] rounded-full centered-pokemon-img">
                        <BsStars className="absolute text-[28px] text-amber-300 hover:cursor-pointer hover:scale-110" onClick={() => setSelectedPokemonIsShiny(!selectedPokemonIsShiny)} />
                        <AiOutlinePlus className="text-[28px] text-[#3c5aa6] hover:cursor-pointer float-right hover:scale-110 top-0" onClick={addSelectedPokemonToParty} />

                        <img
                            src={selectedPokemonIsShiny ? selectedPokemonData.sprites.other["official-artwork"].front_shiny : selectedPokemonData.sprites.other["official-artwork"].front_default}
                            alt={selectedPokemonData.name}
                            className="fade-in"
                        />
                    </div>
                    <div className="flex justify-center mb-3">
                        <AiOutlineArrowLeft className="text-[40px] text-[#3c5aa6] hover:cursor-pointer hover:scale-110" onClick={selectPreviousPokemon} />
                        <AiOutlineArrowRight className="text-[40px] ml-16 text-[#3c5aa6] hover:cursor-pointer hover:scale-110" onClick={selectNextPokemon} />
                    </div>
                    <p className="w-[800px] font-light">{selectedPokemonData.best_flavor_entrie.text}</p>
                    <div className="flex mt-3">
                        {selectedPokemonData.types.map((type, index) => (
                            <PokemonTypeCard key={index} pokemonType={type.type.name} />
                        ))}
                    </div>
                    <div className="mt-3 flex">
                        <h1>Abilites:</h1>
                        <div className="flex whitespace-pre-wrap">
                            {selectedPokemonData.abilities.map((ability, index) => (
                                <p key={index} className="font-light">&nbsp;{toStartCaseString(ability.ability.name)}{index !== selectedPokemonData.abilities.length - 1 && ", "}</p>
                            ))}
                        </div>
                    </div>
                    <h1 className="mt-3">Base stats:</h1>
                    <Stats />
                    <div>
                        <PokemonMoves moves={selectedPokemonData.moves} />
                    </div>
                </div>
            </div>
        )
    }
}

export default PokemonDataPage