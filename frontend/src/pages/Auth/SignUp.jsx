import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Inputs/Input'
import { LuBadgeAlert } from 'react-icons/lu'
import { ProfilePhotoSelector } from '../../components/Inputs/ProfilePhotoSelector'

export const Signup = ({setCurrentPage}) => {
const [profilePic, setProfilePic] = useState("")
const [fullName, setFullName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const [error, setError] = useState(null)

const navigate = useNavigate()



const handleSignUp=(e)=>{
e.preventDefault()

let profileImgUrl = ""

if(!fullName){
  setError("Please enter your name")
  return
}

if(!ValidateEmail(email)){
  setError("Please enter valid email address")
  return
}
if(!password){
  setError("Please enter the password")
  return
}
setError("")

//signup api call

try {
  
} catch (error) {
  if(error.response && error.response.data.message){
    setError(error.response.data.message)
  }else{
    setError("Something went wrong. Please try again")
  }
}


}

  return (
    <div className=' md:w-[500px] mt'>
     
      <p className='text-[gray] text-center'>Join us today and start acing your interview</p>


      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

      <form className='mt-5 flex flex-col ' action="" onSubmit={handleSignUp}>

        <label htmlFor="">Full Name</label>
        <Input className='' value={fullName} type="text" onChange={({target})=>setFullName(target.value)}
        placeholder='john Doe'
        />

        <label className='mt-5' htmlFor="">Email</label>
        <Input className='' value={email} type="text" onChange={({target})=>setEmail(target.value)}
        placeholder='john@example.com'
        />

        <label className='mt-5' htmlFor="">Password</label>
         <Input className='' value={password} type="password" onChange={({target})=>setPassword(target.value)}
        placeholder='min 8 characters' 
        />


        {/* error handling */}
        {error && <p className='text-[#ff2222] py-2.5 flex items-center gap-2'><LuBadgeAlert/> {error}</p> }


        <button type='submit' className='cursor-pointer transition-all duration-100 active:scale-95 hover:bg-[#323232] text-white mt-6 py-2 bg-black'>Sign Up</button>

        <p className='mt-5'>Already have an account ?{" "}
        <button className='text-blue-600 hover:text-blue-500 cursor-pointer' onClick={()=>{setCurrentPage("login")}}>Login</button>
        </p> 

      </form>
    </div>
  )
}
