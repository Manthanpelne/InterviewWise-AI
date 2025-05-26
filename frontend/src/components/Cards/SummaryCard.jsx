import React from 'react'
import { LuDelete, LuTrash } from 'react-icons/lu'
import { getInitials } from '../utils/validate'

export const SummaryCard = React.memo(({
  colors,
  role,
  experience,
  topicsToFocus,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete
}) => {
    

  return (
    <div onClick={onSelect} className=' text-black bg-white rounded-xl transition-all duration-200 active:scale-x-95 p-3 overflow-hidden cursor-pointer shadow-lg shadow-[#ebebeb] hover:shadow-xl relative group'>
        <div className='rounded-xl p-4 cursor-pointer relative' style={{background: colors.bgcolor}} >
            <div className='flex items-start'>
                <div className='flex flex-shrink-0 w-12 h-12 bg-white rounded-md items-center justify-center mr-4'>
                    <span>
                        {getInitials(role)}
                    </span>
                </div>

                {/* content container */}
                <div className='flex-grow'>
                    <div className='flex justify-between items-start'>
                        {/* title and skills */}
                        <div>
                            <h2 className='text-lg font-medium'>{role}</h2>
                            <p className='text-sm font-medium text-[gray]'>{topicsToFocus}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className='group-hover:flex border items-center gap-1 hover:shadow-xl transition-all duration-200 active:scale-95 active:shadow-none hidden text-xs text-rose-500 bg-rose-50 px-3 py-1 rounded border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0' onClick={(e)=>{e.stopPropagation()
                onDelete()
            }}>
             <LuTrash/>  Delete
            </button>
        </div>

       
            <div className=' flex flex-col bg-gray-50 p-2 gap-2 mt-4'>
                <div className='text-sm flex justify-between font-medium '>
                    <span>
                    Experience : {experience} {experience == 1 ? "Year" : "Years"}
                    </span>
                    <span className='rounded-full border border-[gray] px-2 '>
                    {questions} Q&A
                    </span>
                </div>   

            {/* description */}
            <p className=' line-clamp-2'>{description}</p>
        </div>

                <div className='text-xs font-medium mt-3 text-[gray] '>
                    Last Updated : {lastUpdated}
                </div>      
    </div>
  )
});
