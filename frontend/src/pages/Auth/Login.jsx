import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Inputs/Input'
import { LuBadgeAlert, LuLoader } from 'react-icons/lu'
import { ValidateEmail } from '../../components/utils/validate'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import { UserContext } from '../../context/useContext'

export const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

 const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()


  const handleLogin = async (e) => {

    e.preventDefault()

    if (!ValidateEmail(email)) {
      setError("Please enter valid email address")
      return
    }
    if (!password) {
      setError("Please enter the password")
      return
    }
    setError("")
    setLoading(true)

    //login api call
    try {

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })
      const { token } = response.data
      if (token) {
        localStorage.setItem("AIToken", token)
        updateUser(response.data)
        navigate("/dashboard")
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
        console.log(error)
      } else {
        setError("Something went wrong. Please try again")
      }
    } finally {
      setLoading(false)
    }


  }

  return (
    <div className='max-w-4xl md:w-[500px] mt-3'>
       <h1 className='text-center font-bold text-2xl'><span className='textGradient'>InterviewWise</span> AI</h1>
      <h3 className='mt-3'>Welcome Back</h3>
      <p className='text-[gray]'>Please enter details to login</p>

      <form className='mt-5 flex flex-col ' action="" onSubmit={handleLogin}>
        <label htmlFor="">Email</label>
        <Input className='' value={email} type="text" onChange={({ target }) => setEmail(target.value)}
          placeholder='john@example.com'
        />

        <label className='mt-5' htmlFor="">Password</label>
        <Input className='' value={password} type="password" onChange={({ target }) => setPassword(target.value)}
          placeholder='min 8 characters'
        />


        {/* error handling */}
        {error && <p className='text-[#ff2222] pt-2 flex items-center gap-2'><LuBadgeAlert /> {error}</p>}


        <button
          type='submit'
          className={`cursor-pointer transition-all duration-100 active:scale-95 hover:bg-[#323232] text-white mt-6 py-2 text-sm md:text-[16px] bg-black flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 animate-spin' viewBox="0 0 24 24"><path fill="white" d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364"/></svg>
          ) : (
            'LOGIN'
          )}
        </button>

        <p className='mt-5'>Don't have an account ?{" "}
          <button className='text-blue-600 hover:text-blue-500 cursor-pointer' onClick={() => { setCurrentPage("sign-up") }}>Register</button>
        </p>

      </form>
    </div>
  )
}