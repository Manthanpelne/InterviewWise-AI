import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/useContext'
import { useNavigate } from 'react-router-dom'
import { LuUser } from 'react-icons/lu'


export const ProfileInfoCard = () => {

  const {user, clearUser} = useContext(UserContext)
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout=()=>{
    setIsLoggingOut(true)
    localStorage.clear()
    
    setTimeout(() => {
      clearUser();
      navigate("/")
    }, 1000);
  }

  //console.log("user",user)

  return (
    user && (
    <div className='flex items-center gap-5'>
      <div className='flex items-center gap-2'>
     {user.profileImageUrl==null || user.profileImageUrl === ""? 
       (<LuUser className='text-3xl w-6 h-6 text-[black] rounded-full border-2 p-[2px]' />) :
     (<img
        src={user?.profileImageUrl}
        alt="profile-image"
        className="w-10 h-10 rounded-full object-cover" // Added some basic styling
      />)}
      <span className="font-semibold text-lg">{user?.name || ""}</span>
       </div>
      <div>
        <button
          className='bg-[#E74041] cursor-pointer text-white py-2 px-4 rounded hover:bg-[#be2525] transition-colors duration-300' // Added some basic styling
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging Out..." : "Logout"}
        </button>
      </div>
    </div>)
  )
}