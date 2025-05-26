import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import { LandingPage } from './pages/LandingPage'
import { Login } from './pages/Auth/Login'
import { Dashboard } from './pages/Home/Dashboard'
import { InterviewPrep } from './pages/InterviewPrep/InterviewPrep'
import { Signup } from './pages/Auth/SignUp'
import { Footer } from './pages/Home/Footer'
import { ErrorPage } from './pages/ErrorPage'

function App() {


  return (
    <>
       <section className='max-w-screen-2xl outfit mx-auto min-h-screen'>
            
                <Router>
                  <Routes>
                  <Route path='/' element={<LandingPage/>} />
                  <Route path='*' element={<ErrorPage/>} />
                  <Route path='/login' element={<Login/>} />
                  <Route path='/sign-up' element={<Signup/>} />
                  <Route path='/dashboard' element={<Dashboard/>} />
                  <Route path='/interview-prep/:sessionId' element={<InterviewPrep/>} />
                  </Routes>
                </Router>

                <Toaster 
                  toastOptions={{
                    className: "",
                    style : {
                      fontSize : "13px"
                    }
                  }}
                />

                <Footer />
            
       </section>
    </>
  )
}

export default App
