import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuActivity, LuFileQuestion, LuPin, LuSave, LuSearch, LuSparkle, LuWifi } from 'react-icons/lu';
import { Login } from './Auth/Login';
import { Modal } from '../Modal';
import { Signup } from './Auth/Signup';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <>
      <div className='w-[90%] mx-auto min-h-full'>
        {/* header */}
        <header className='flex justify-between items-center py-5 md:py-7'>
          <a href='' className='font-bold text-lg'>
            InterviewWise AI
          </a>
          <button
            className='px-5 transition-all duration-100 active:scale-95 shadow-lg cursor-pointer hover:bg-gray-800 rounded-4xl py-2.5 bg-black text-white text-sm'
            onClick={() => setOpenAuthModal(true)}
          >
            Login | Sign Up
          </button>
        </header>

        <hr className='opacity-20' />
         {/* hero section */}
     <div className='flex flex-col py-5 md:py-10 md:flex-row gap-6 md:gap-20 justify-between md:items-center'>
          <div className='md:w-1/2 flex flex-col gap-2'>
           <button className='flex gap-2 items-center justify-center rounded-4xl text-sm py-1.5 pr-1 text-[#db8686] border w-32 text-center'><LuSparkle/> AI Powered</button>
           <h1 className='text-3xl md:text-5xl font-extrabold text-black'>Ace Interviews with <br/> <span className='textGradient'>AI-Powered</span> Learning</h1>
           </div>
           <div className='md:w-1/2 flex flex-col gap-5'>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium inventore mollitia velit nihil soluta impedit sunt tenetur itaque tempora aperiam, atque in officiis quibusdam eius, nam nemo debitis ipsa fugit.</p>
               <a href="" className='bg-black shadow-lg w-40 text-center px-6 rounded-4xl border text-white py-2 '>Get Started</a>
           </div>
     </div>

     <img className='w-[80%] m-auto py-5 md:py-10 shadow-xl' src="https://cdn.dribbble.com/userupload/18322788/file/original-62e37d9246605c24352cf56d71156c64.png?resize=1504x1128&vertical=center" alt="" />
    

     {/* feature section */}
     <div className="bg-white my-20 py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:text-center">
      <p className="mt-2 text-3xl leading-8 font-extrabold text-gray-900 sm:text-4xl">
        Ace Your Interviews with AI Power
      </p>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        Unlock your interview potential with these intelligent tools designed to help you succeed.
      </p>
    </div>

    <div className="mt-10">
      <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-10">
        <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <div className="p-6">
            <dt>
              <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#c36b6b] text-white">
               <LuPin/>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Pin to Top Question</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Keep your most challenging or important questions readily accessible for focused practice.
            </dd>
          </div>
        </div>

        <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <div className="p-6">
            <dt>
              <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#c36b6b] text-white">
                <LuSearch/>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Deep Search with Gemini AI</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Leverage the power of Gemini AI to uncover comprehensive solutions and diverse perspectives on interview questions.
            </dd>
          </div>
        </div>

        <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <div className="p-6">
            <dt>
              <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#c36b6b] text-white">
                <LuWifi/>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Tailored For You</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Receive personalized question recommendations and learning paths based on your skills and target roles.
            </dd>
          </div>
        </div>

        <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <div className="p-6">
            <dt>
              <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#c36b6b] text-white">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Learn At Your Own Pace</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Progress through the material at a speed that suits your learning style and schedule.
            </dd>
          </div>
        </div>

        <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <div className="p-6">
            <dt>
              <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#c36b6b] text-white">
               <LuFileQuestion/>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Understand Why Behind Answers</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Gain deeper insights with explanations that clarify the reasoning and logic behind correct answers.
            </dd>
          </div>
        </div>
        <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <div className="p-6">
            <dt>
              <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#c36b6b] text-white">
              <LuSave/>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Save, Organize & Revisit</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Save important questions and solutions, organize them into collections, and revisit them anytime for effective review.
            </dd>
          </div>
        </div>
      </dl>
    </div>
  </div>
    </div>
      </div>

      {openAuthModal && (
        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setOpenAuthModal(false);
            setCurrentPage('login');
          }}
          hideHeader
        >
          <div>
            {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
            {currentPage === 'sign-up' && <Signup setCurrentPage={setCurrentPage} />}
          </div>
        </Modal>
      )}
    </>
  );
};