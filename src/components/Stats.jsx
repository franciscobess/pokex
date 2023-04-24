import React, { useContext } from 'react'
import { PokemonListContext } from '../context/PokemonListContext'

const Stats = () => {
    const { selectedPokemonData, toStartCaseString } = useContext(PokemonListContext)
    const stats = selectedPokemonData.stats

    return (
        <div className={`flex w-[800px] mt-2`}>
            {stats.map((stat, index) => (
                <div key={index} className={`${index !== 0 && "ml-2"} bg-[#3c5aa6] w-[130px] h-[50px] rounded-md px-2 flex relative`}>
                    <span className='text-[15px] text-white font-semibold'>{toStartCaseString(stat.stat.name)}</span>
                    <span className='absolute bottom-0 right-1 font-extralight text-[24px] text-[white]'>{(stat.base_stat)}</span>
                </div>
            ))}
        </div>
    )
}

export default Stats