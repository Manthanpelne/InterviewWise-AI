import React, { useContext } from 'react'
import { UserContext } from '../../context/useContext'
import { ProfileInfoCard } from '../../components/Cards/ProfileInfoCard'

export const Navbar = ({setOpenAuthModal}) => {

     const {user} = useContext(UserContext)

  return (
      
         <header className='w-[90%] m-auto  flex justify-between items-center py-5 md:py-7'>
                  <a href='/' className='font-bold text-lg'>
                    InterviewWise AI
                  </a>
                 { user? (<ProfileInfoCard/>) :
                  (<button
                    className='px-5 transition-all duration-100 active:scale-95 shadow-lg cursor-pointer hover:bg-gray-800 rounded-4xl py-2.5 bg-black text-white text-sm'
                    onClick={() => setOpenAuthModal(true)}
                  >
                    Login | Sign Up
                  </button>)}
        </header>
  )
}
