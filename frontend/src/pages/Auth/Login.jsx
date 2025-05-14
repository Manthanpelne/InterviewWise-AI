import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Inputs/Input'
import { LuBadgeAlert } from 'react-icons/lu'
import { ValidateEmail } from '../../components/utils/validate'

export const Login = ({setCurrentPage}) => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState(null)

const navigate = useNavigate()


const handleLogin=(e)=>{
e.preventDefault()

if(!ValidateEmail(email)){
  setError("Please enter valid email address")
  return
}
if(!password){
  setError("Please enter the password")
  return
}
setError("")

//login api call

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
    <div className='max-w-4xl md:w-[500px] mt-7'>
      <h3>Welcome Back</h3>
      <p className='text-[gray]'>Please enter details to login</p>

      <form className='mt-5 flex flex-col ' action="" onSubmit={handleLogin}>
        <label htmlFor="">Email</label>
        <Input className='' value={email} type="text" onChange={({target})=>setEmail(target.value)}
        placeholder='john@example.com'
        />

        <label className='mt-5' htmlFor="">Password</label>
         <Input className='' value={password} type="password" onChange={({target})=>setPassword(target.value)}
        placeholder='min 8 characters' 
        />


        {/* error handling */}
        {error && <p className='text-[#ff2222] pt-2 flex items-center gap-2'><LuBadgeAlert/> {error}</p> }


        <button type='submit' className='cursor-pointer transition-all duration-100 active:scale-95 hover:bg-[#323232] text-white mt-6 py-2 text-sm md:text-[16px] bg-black'>LOGIN</button>

        <p className='mt-5'>Don't have an account ?{" "}
        <button className='text-blue-600 hover:text-blue-500 cursor-pointer' onClick={()=>{setCurrentPage("sign-up")}}>Register</button>
        </p> 

      </form>
    </div>
  )
}
