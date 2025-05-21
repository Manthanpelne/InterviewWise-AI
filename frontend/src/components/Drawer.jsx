import React from 'react'
import { LuX } from 'react-icons/lu'

export const Drawer = ({isOpen, onClose, title, children}) => {
  return (
    <div tabIndex="-1" area-labelledby="drawer-right-label" className={`fixed top-[100px] sm:top-[132px] right-0 p-8 overflow-y-auto z-40  h-[calc(100vh-64px)] w-full md:w-[40vw] bg-white shadow-lg rounded-lg border-r border-l-gray-800 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
       
       {/* header */}
         <div className='flex items-center justify-between mb-4'>
            <h5 id='drawer-right-label' className='flex items-center text-base font-semibold text-black'>{title}</h5>
              
             <button onClick={onClose} type='button' className='text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center'>
              <LuX className='text-lg'/>
             </button>
         </div>
          <hr className='opacity-20 mb-4'/>
         {/* body content */}
         <div className='text-sm mx-3 mb-6'>
          {children}
         </div>
    </div>
  )
}
