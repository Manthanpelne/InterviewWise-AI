import React from 'react'
import { LuBadgeAlert } from 'react-icons/lu'

export const DeleteAlertContent = ({content, onDelete}) => {
  return (
    <div className='p-5'>
        <p className='flex items-center gap-2 text-lg '><LuBadgeAlert/> {content}</p>

        <div className='flex mt-8 text-white justify-end'>
            <button onClick={onDelete} className='px-3 cursor-pointer shadow-lg rounded py-1 bg-[#E74041] hover:bg-[#d32c2c]'>Delete</button>
        </div>
    </div>
  )
}
