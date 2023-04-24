import React from 'react'
import MoveCard from './MoveCard'

const PokemonMoves = ({ moves }) => {
    return (
        <div className='mt-3'>
        <h1 className='font-light text-[24px]'>Moves</h1>
            <table className='table-fixed mt-2'>
                <tbody>
                    <tr className='w-[800px] wrap-row'>
                        {moves.map((move, index) => (
                            <MoveCard move={move} key={index} index={index} />
                        ))}
                    </tr>
                </tbody>

            </table>
        </div>
    )
}

export default PokemonMoves