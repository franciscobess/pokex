import React, { useContext } from 'react'
import { PokemonListContext } from '../context/PokemonListContext'
import alertIcon from '../common/pokealert.png'

const AlertModal = () => {
    const { alertModalText, setAlertModalVisibility, setAlertModalText } = useContext(PokemonListContext)

    const closeAlertModal = () => {
        setAlertModalVisibility(false)
        setAlertModalText("")
    }

    return (
        <div className="fixed z-10 pt-[100px] w-[100%] h-[100%] modal ">
            <div className="bg-[#fefefe] m-auto px-[20px] py-[5px] w-[300px] border-[1px] border-solid border-[#888] rounded-md text-justify">
                <img src={alertIcon} alt="Poke alert" className='w-[50px] poke-alert' />
                <p className='font-light mb-3 mt-2'>{alertModalText}</p>
                <button className='flex bg-[#ffcb05] px-2 py-[1px] rounded-md font-extralight text-[14px] border-[1px] border-black centered-button' onClick={closeAlertModal}>OK</button>
            </div>
        </div>
    )
}

export default AlertModal