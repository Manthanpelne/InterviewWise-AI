import React, { useContext } from 'react'
import { UserContext } from '../../context/useContext'
import { ProfileInfoCard } from '../../components/Cards/ProfileInfoCard'

export const Navbar = ({setOpenAuthModal}) => {

     const {user} = useContext(UserContext)

  return (
      
         <header className='w-[90%] m-auto  flex justify-between items-center py-5 md:py-7'>
                  <a href='/' className='font-bold text-xl'>
                    <span className='textGradient'>InterviewWise</span> AI
                  </a>
                 { user? (<ProfileInfoCard/>) :
                  (<button
                    className='px-5 transition-all duration-100 hover:shadow-[#b1b1fa] hover:scale-105 active:scale-100 shadow-lg cursor-pointer hover:bg-gray-800 rounded py-2 bg-black text-white text-sm'
                    onClick={() => setOpenAuthModal(true)}
                  >
                    Login | Sign Up
                  </button>)}
        </header>
  )
}
