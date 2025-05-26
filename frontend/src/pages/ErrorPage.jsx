import React from 'react'
import { Navbar } from './Home/Navbar'

export const ErrorPage = () => {
  return (
    <>
    <Navbar/>
    <section className='max-w-screen-2xl  mx-auto'>
         <hr className='opacity-20 w-[95%] m-auto'/>
        <div className='max-w-5xl mx-auto pt-20 '>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold text-gray-800'>404</h1>
                <p className='text-lg text-gray-600 mt-2'>Page Not Found</p>
                <p className='text-sm text-gray-500 mt-1'>The page you are looking for does not exist.</p>
                  
                <img className='md:w-1/2' src="/error.svg" alt="" />
            </div>
        </div>
    </section>
    </>
  )
}
