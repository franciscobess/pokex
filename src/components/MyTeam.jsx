import { useContext } from "react"
import PokemonCard from "./PokemonCard"
import { PokemonListContext } from "../context/PokemonListContext"
import CreateRandomTeam from "./CreateRandomTeam"

const MyTeam = () => {
    const { myParty } = useContext(PokemonListContext)

    if (myParty.length > 0) {
        return (
            <div className="fixed mt-3 ml-2">
                <h1 className="text-center mb-2 font-light text-lg">My team</h1>
                {myParty.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))}
            </div>
        )
    }
}

export default MyTeam