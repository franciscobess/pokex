import _, { filter } from "lodash"
import { TiDeleteOutline } from "react-icons/ti";
import { PokemonListContext } from '../context/PokemonListContext';
import { useContext } from 'react';

const PokemonCard = ({ pokemon }) => {
    const {
        myParty,
        setMyParty,
    } = useContext(PokemonListContext)

    const deletePokemonFromParty = () => {
        const indexToRemove = myParty.findIndex(pkm => pkm.id === pokemon.id)
        const filteredList = _.cloneDeep(myParty)
        filteredList.splice(indexToRemove, 1)

        setMyParty(filteredList)
    }

    return (
        <div>
            <div className='z-0 bg-[#ee1515] w-[60px] h-[30px] rounded-full half-top opacity-red-bg '>
                <TiDeleteOutline className="absolute text-[12px] text-[#ff2200] right-[-5px] hover:cursor-pointer hover:scale-110" onClick={deletePokemonFromParty} />
                <img src={pokemon.is_shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default} />
            </div>
            <div className='z-0 bg-[#dedede] w-[60px] h-[30px] rounded-full border-[1px] half-bottom mb-1' />
        </div>
    )
}

export default PokemonCard