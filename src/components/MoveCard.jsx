import React, { useContext, useEffect, useState } from 'react'
import { PokemonListContext } from '../context/PokemonListContext'
import typeColors from "./TypeColors"
import axios from 'axios'

const MoveCard = ({ move, index }) => {
    const { toStartCaseString } = useContext(PokemonListContext)
    const [movedata, setMoveData] = useState("")

    useEffect(() => {
        axios.get(move.move.url)
            .then((response) => setMoveData(response.data))
            .catch((err) => console.error(`Error connecting on API: ${err}`))
    }, [])

    const typeColor = movedata ? typeColors[movedata.type.name] : typeColors.missingno

    return (
        <td
            className={`px-1 rounded-md w-[194px] h-[40px] mb-2 text-center pt-2 text-white ${index % 4 !== 0 && 'ml-2'} bg-gradient-to-r from-[${typeColor}]`}
            style={{ backgroundImage: `linear-gradient(to right, ${typeColor}, #c2c2c2 150%)` }}
        >
            {toStartCaseString(move.move.name)}</td>
    )
}

export default MoveCard