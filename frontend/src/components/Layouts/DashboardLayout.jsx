import React, { useContext } from 'react'
import { UserContext } from '../../context/useContext'
import { Navbar } from '../../pages/Home/Navbar'

export const DashboardLayout = ({children}) => {

    const {user} = useContext(UserContext)

  return (
    <div className='md:min-h-screen'>
        <Navbar/>
        
        {user && <div>{children}</div> }
    </div>
  )
}
