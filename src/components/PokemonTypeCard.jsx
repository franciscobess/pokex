import { useContext } from "react"
import { PokemonListContext } from "../context/PokemonListContext"
import typeColors from "./TypeColors"

const PokemonTypeCard = ({ pokemonType }) => {
    const { toStartCaseString } = useContext(PokemonListContext)

    return (
        <div
            className={"py-1 px-3 rounded-md text-white ml-1"}
            style={{ backgroundImage: `linear-gradient(to right, ${typeColors[pokemonType]}, #d7d7d7 150%)` }}
        >{toStartCaseString(pokemonType)}</div>
    )
}

export default PokemonTypeCard