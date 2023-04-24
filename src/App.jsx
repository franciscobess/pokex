import React, { useEffect, useState } from 'react'
import axios from 'axios'
import _ from "lodash"
import PokemonDataList from './components/PokemonDataList'
import { PokemonListContext } from './context/PokemonListContext'
import PokemonDataPage from './components/PokemonDataPage'
import MyTeam from './components/MyTeam'
import AlertModal from './components/AlertModal'
import { BsCloudSnowFill } from 'react-icons/bs'

const App = () => {
  const API_BASE_URL = "https://pokeapi.co/api/v2"
  const [pokemonList, setPokemonList] = useState([])
  const [selectedGeneration, setSelectedGeneration] = useState(1)
  const [selectedPokemon, setSelectedPokemon] = useState({})
  const [selectedPokemonIsShiny, setSelectedPokemonIsShiny] = useState(false)
  const [selectedPokemonData, setSelectedPokemonData] = useState({})
  const [myParty, setMyParty] = useState([])
  const [alertModalVisibility, setAlertModalVisibility] = useState(false)
  const [alertModalText, setAlertModalText] = useState("")

  const toStartCaseString = (string) => {
    return _.startCase(string)
  }

  const state = {
    pokemonList,
    setPokemonList,
    selectedGeneration,
    setSelectedGeneration,
    selectedPokemon,
    setSelectedPokemon,
    selectedPokemonIsShiny,
    setSelectedPokemonIsShiny,
    selectedPokemonData,
    setSelectedPokemonData,
    toStartCaseString,
    myParty,
    setMyParty,
    alertModalVisibility,
    setAlertModalVisibility,
    alertModalText,
    setAlertModalText
  }

  useEffect(() => {
    axios.get(`${API_BASE_URL}/generation/${selectedGeneration}`)
      .then((response) => {
        response.data.pokemon_species.forEach(pokemon => {
          pokemon.name = toStartCaseString(pokemon.name)
        })

        const tempPokemonList = response.data.pokemon_species

        // adding id to the list based on pokemon url
        tempPokemonList.map((pokemon) => {
          pokemon.id = Number(pokemon.url.split("/")[6])
        })

        setPokemonList(_.sortBy(tempPokemonList, (pokemon) => pokemon.id))
      })
      .catch((err) => console.error(`Error connecting on API: ${err}`))
  }, [selectedGeneration]);

  if (!_.isEmpty(selectedPokemon) && _.isEmpty(selectedPokemonData)) {
    axios.get(`${selectedPokemon.url}`)
      .then((response) => {
        setSelectedPokemonData(response.data)
      })
      .catch((err) => console.error(`Erro fetching ${selectedPokemon.name} data: ${err}`))
  }

  // means that i have pokemon data but doesn't have pokemon-species data
  if (!_.isEmpty(selectedPokemon) && !_.isEmpty(selectedPokemonData) && selectedPokemonData.sprites === undefined) {
    axios.get(`${API_BASE_URL}/pokemon/${selectedPokemonData.id}`)
      .then((response) => {
        const pokemonData = response.data

        setSelectedPokemonData(selectedPokemonData => ({
          ...selectedPokemonData, ...pokemonData
        }))
      })
      .catch((err) => console.error(`Erro fetching ${selectedPokemon.name} data: ${err}`))
  }

  const getBestFlavor = (flavorEntries, language = "en") => {
    const bestEntrie = _.filter(flavorEntries, (entrie) => entrie.language.name === language)

    return bestEntrie[0].flavor_text.replace(/(\r\n|\n|\r|\f)/gm, " ")
  }

  if (!_.isEmpty(selectedPokemonData) && selectedPokemonData.flavor_text_entries && !selectedPokemonData.best_flavor_entrie) {
    const best_flavor_entrie = { text: getBestFlavor(selectedPokemonData.flavor_text_entries) }

    setSelectedPokemonData(selectedPokemonData => ({
      ...selectedPokemonData, best_flavor_entrie
    }))
  }

  return (
    <PokemonListContext.Provider value={state}>
      {alertModalVisibility && <AlertModal />}

      <MyTeam />
      <PokemonDataList />
      <PokemonDataPage />

    </PokemonListContext.Provider>


  )
}

export default App