import React from 'react'

export const RoleInfoHeader = ({role,topicsToFocus, experience, questions, description, lastUpdated}) => {
   
  return (
    <div className='relative md:w-[90%] m-auto mt-10 '>
        <div className='mx-auto px-4 md:px-0'>
            <div className=' flex flex-col justify-center relative z-10'>
                <div className='flex items-start'>
                    <div className='flex-grow'>
                        <div className='flex justify-between items-start'>
                            <div>
                             <h2 className='text-2xl font-medium'>{role}</h2>
                             <p className='text-sm text-[gray] mt-1'>{topicsToFocus}</p>
                            </div>
                        </div>
                    </div>
                </div>
           

            <div className='flex flex-wrap items-center gap-3 mt-4'>
               <div className='text-sm font-semibold text-white bg-black rounded-full px-3 py-1'>Experience: {experience} {experience == 1 ? "Year" : "Years"} </div> 
               <div className='text-sm font-semibold text-white bg-black rounded-full px-3 py-1'>{questions} Q&A</div>
               <div className='text-sm font-semibold text-white bg-black rounded-full px-3 py-1'>Last Updated: {lastUpdated}</div>
            </div>
         </div>
         </div>
    </div>
  )
}
