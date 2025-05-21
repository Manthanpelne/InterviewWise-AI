import React, { useContext } from 'react'
import { UserContext } from '../../context/useContext'
import { Navbar } from '../../pages/Home/Navbar'

export const DashboardLayout = ({children}) => {

    const {user} = useContext(UserContext)

  return (
    <div>
        <Navbar/>
        
        {user && <div>{children}</div> }
    </div>
  )
}
