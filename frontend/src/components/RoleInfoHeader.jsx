import React from 'react'
import {LuArrowBigLeft, LuLoader} from "react-icons/lu"

export const RoleInfoHeader = ({role,topicsToFocus, experience, questions, description, lastUpdated}) => {
   
  return (
    <div className='relative md:w-[90%] m-auto mt-10 py-8 bg md:p-8'>
        {!role || !topicsToFocus || !experience || !questions || !description || !lastUpdated ? (
            <div className='text-center text-[gray] text-3xl flex justify-center'><LuLoader className='animate-spin'/></div>
        ) : (
        <div className='mx-auto px-4 md:px-0'>
            <div className=' flex flex-col justify-center relative z-10'>
                <div className='flex items-start'>
                    <div className='flex-grow'>
                        <div className='flex justify-between items-start'>
                            <div>
                             <h2 className='text-2xl font-medium'>{role}</h2>
                             <p className='text-sm text-[#555252] mt-1'>{topicsToFocus}</p>
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
    )} 
          <a className='absolute top-5 z-10 cursor-pointer right-5 border border-[#E74041] hover:text-[#cc2e2e] bg-[#fbe4cc] hover:bg-[#f7d5ae] rounded shadow-lg transition-all duration-200 active:scale-95 active:shadow-none hover:border-[#cc2e2e] text-[#E74041] px-3 py-1 flex items-center gap-1' href="/dashboard"> <LuArrowBigLeft/> Back
         </a>
    </div>
  )
}
