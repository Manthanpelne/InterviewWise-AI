import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Inputs/Input'
import { LuBadgeAlert } from 'react-icons/lu'
import { ProfilePhotoSelector } from '../../components/Inputs/ProfilePhotoSelector'
import { UserContext } from '../../context/useContext'
import axiosInstance from '../../utils/axiosInstance'
import { uploadImage } from '../../utils/uploadImage'
import { ValidateEmail } from '../../components/utils/validate'
import { API_PATHS } from '../../utils/apiPath'

export const Signup = ({setCurrentPage}) => {
const [profilePic, setProfilePic] = useState("")
const [fullName, setFullName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)


const {updateUser} = useContext(UserContext)


const [error, setError] = useState(null)

const navigate = useNavigate()



const handleSignUp= async(e) => { 
e.preventDefault()


if(!fullName || !ValidateEmail(email) || !password){
  setError("Please enter all the fields")
  return
}
setError("")
setLoading(true)

//signup api call

try {

  if(profilePic){
    var imgUpload = await uploadImage(profilePic)
    //console.log("imgUpload",imgUpload)
  }
  
  const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
    name:fullName,
    email,
    password,
    profileImageUrl:imgUpload?.imgUrl || ""
  })
  console.log("response:", response.data)
  const {token} = response.data
  if(token){
    localStorage.setItem("AIToken",token)
    updateUser(response.data)
    navigate("/dashboard")
  }
  
} catch (error) {
  if(error.response && error.response.data.message){
    setError(error.response.data.message)
  }else{
    setError("Something went wrong. Please try again")
    console.log(error)
  }
}finally{
  setLoading(false)
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


        <button disabled={loading} type='submit' className='cursor-pointer transition-all duration-100 active:scale-95 hover:bg-[#323232] text-white mt-6 py-2 bg-black'>
         {loading ? (
            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 animate-spin m-auto' viewBox="0 0 24 24"><path fill="white" d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364"/></svg>
          ) : (
            'Sign Up'
          )}
          </button>

        <p className='mt-5'>Already have an account ?{" "}
        <button className='text-blue-600 hover:text-blue-500 cursor-pointer' onClick={()=>{setCurrentPage("login")}}>Login</button>
        </p> 

      </form>
    </div>
  )
}
