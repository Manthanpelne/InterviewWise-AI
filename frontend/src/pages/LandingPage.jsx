import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuActivity,
  LuFileQuestion,
  LuPin,
  LuSave,
  LuSearch,
  LuSparkle,
  LuWifi,
} from "react-icons/lu";
import { Login } from "./Auth/Login";
import { Modal } from "../Modal";

import { UserContext } from "../context/useContext";
import { ProfileInfoCard } from "../components/Cards/ProfileInfoCard";
import { Signup } from "./Auth/SignUp";
import { Navbar } from "./Home/Navbar";
import toast from "react-hot-toast";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const { user } = useContext(UserContext);

  const handleCTA = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/dashboard");
    } else {
      toast.error("Please login to continue");
    }
  };



  //faq

  const [openFAQ, setOpenFAQ] = useState({});

  const toggleAccordion = (id) => {
    setOpenFAQ(prevState => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the state for the clicked ID
    }));
  };

  const faqItems = [
    {
      id: 'faq1',
      question: 'How accurate are the AI-generated questions?',
      answer: 'Our AI leverages advanced natural language processing and machine learning to analyze job descriptions and industry trends, generating highly accurate and relevant questions designed to simulate real interview scenarios.',
    },
    {
      id: 'faq2',
      question: 'What industries and roles do you support?',
      answer: 'InterviewWise AI is designed to support a wide range of industries including Tech, Marketing, Finance, Healthcare, and more. It can generate questions for entry-level to senior management roles.',
    },
    {
      id: 'faq3',
      question: 'Is my data secure?',
      answer: 'Absolutely. We prioritize your privacy and data security. All information you provide is encrypted and stored securely. We adhere to strict data protection protocols.',
    },
    {
      id: 'faq4',
      question: 'Can I save my generated questions?',
      answer: 'No, but you can pin and unpin questions to keep them at the top of your list for easy access. This feature allows you to focus on the most important questions without cluttering your workspace.',
    },
    {
      id: 'faq5',
      question: 'Do you offer mock interviews?',
      answer: 'A fully interactive AI-powered mock interview bot is a feature currently in development and will be available to users soon. This feature will allow you to practice your responses in a simulated interview environment, providing real-time feedback and suggestions for improvement.',
    },
  ];

  return (
    <>
      {/* header */}
      <Navbar setOpenAuthModal={setOpenAuthModal} />

      <hr className="opacity-20 w-[95%] m-auto" />
      <div className="w-[90%] mx-auto min-h-full">
        {/* hero section */}
        <div className="flex flex-col py-5 md:py-10 md:flex-row gap-6 md:gap-20 justify-between md:items-center">
          <div className="md:w-1/2 flex flex-col gap-2">
            <button className="flex gap-2 items-center justify-center rounded-4xl text-sm py-1.5 pr-1 text-[#E74041] border w-32 text-center">
              <LuSparkle /> AI Powered
            </button>
            <h1 className="text-3xl md:text-5xl font-extrabold text-black">
              Ace Interviews with <br />{" "}
              <span className="textGradient">AI-Powered</span> Learning
            </h1>
          </div>
          <div className="md:w-1/2 flex flex-col gap-5">
            <p>
              Elevate your interviewing process with InterviewWise AI. This
              intelligent tool harnesses the power of the Gemini API to provide
              a seamless way to create precise and relevant interview questions.
              Just specify the job role and key topics, and our AI will produce
              a diverse range of questions, helping you uncover the most
              qualified candidates and make more informed hiring decisions.
            </p>
            <a
              href=""
              onClick={handleCTA}
              className="bg-black shadow-lg w-40 text-center px-6 rounded-4xl border text-white py-2 "
            >
              Get Started
            </a>
          </div>
        </div>

        <img
          className=" imgShadow m-auto mt-10 py-5 md:py-10"
          src="/heroImg.png"
          alt=""
        />

        {/* feature section */}
        <div className="bg-white md:my-20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p className="mt-2 text-3xl leading-8 font-extrabold text-gray-900 sm:text-4xl">
                Ace Your Interviews with AI Power
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Unlock your interview potential with these intelligent tools
                designed to help you succeed.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="p-6">
                    <dt>
                      <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#E74041] text-white">
                        <LuPin />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Pin to Top Question
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Keep your most challenging or important questions readily
                      accessible for focused practice.
                    </dd>
                  </div>
                </div>

                <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="p-6">
                    <dt>
                      <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#E74041] text-white">
                        <LuSearch />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Deep Search with Gemini AI
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Leverage the power of Gemini AI to uncover comprehensive
                      solutions and diverse perspectives on interview questions.
                    </dd>
                  </div>
                </div>

                <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="p-6">
                    <dt>
                      <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#E74041] text-white">
                        <LuWifi />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Tailored For You
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Receive personalized question recommendations and learning
                      paths based on your skills and target roles.
                    </dd>
                  </div>
                </div>

                <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="p-6">
                    <dt>
                      <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#E74041] text-white">
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Learn At Your Own Pace
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Progress through the material at a speed that suits your
                      learning style and schedule.
                    </dd>
                  </div>
                </div>

                <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="p-6">
                    <dt>
                      <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#E74041] text-white">
                        <LuFileQuestion />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Understand Why Behind Answers
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Gain deeper insights with explanations that clarify the
                      reasoning and logic behind correct answers.
                    </dd>
                  </div>
                </div>
                <div className="relative rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="p-6">
                    <dt>
                      <div className="absolute flex items-center justify-center h-10 w-10 rounded-md bg-[#E74041] text-white">
                        <LuSave />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Save, Organize & Revisit
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Save important questions and solutions, organize them into
                      collections, and revisit them anytime for effective
                      review.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
    </div>

    
     <section class="relative bg-gradient-to-br from-[#4F46E5] to-[#E74041] text-white mt-10 md:mt-0 py-20 md:py-32 overflow-hidden">
            <div class="absolute inset-0 z-0 opacity-10">
                <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.2"></path>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" stroke="none" stroke-width="0"></rect>
                </svg>
            </div>
            <div class="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div class="md:w-1/2 m-auto text-center">
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                        InterviewWise AI: Your Personal Interview Strategist
                    </h1>
                    <p class="text-lg md:text-xl mb-8 text-center opacity-90 max-w-lg mx-auto ">
                        Unleash your full potential. Generate tailored interview questions, practice effectively, and conquer your next career milestone.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={handleCTA} class="px-8 cursor-pointer shadow-lg active:shadow-none py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#BC547C] active:scale-100 transition duration-300 transform hover:scale-105">
                            Get Started Free 
                        </button>
                    </div>
                </div>
          
            </div>
        </section>

    
<div className="w-[90%] mx-auto min-h-screen">
        <section id="testimonials" class="py-20 bg-light">
            <div class="container mx-auto md:px-6 text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-4 text-[#1F2937]">Success Stories: Our Users Are Acing It.</h2>
                <p class=" text-gray-600 mb-16 max-w-3xl mx-auto">
                    Don't just take our word for it. See how InterviewWise AI is transforming careers.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center border border-gray-200">
                        <p class="text-lg text-gray-700 mb-4 italic">
                            "InterviewWise AI was a game-changer! The questions were eerily accurate, helping me land my dream job at Tech Solutions."
                        </p>
                        <div class="flex text-yellow-400 mb-2">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                        </div>
                        <p class="font-semibold text-[#1F2937]">- Jane Doe, Senior Software Engineer</p>
                    </div>
                    <div class="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center border border-gray-200">
                       
                        <p class="text-lg text-gray-700 mb-4 italic">
                            "I felt so prepared after using this platform. It covered areas I hadn't even thought of. Highly recommend!"
                        </p>
                        <div class="flex text-yellow-400 mb-2">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                        </div>
                        <p class="font-semibold text-[#1F2937]">- John Smith, Marketing Manager</p>
                    </div>
                    <div class="bg-white p-8 rounded-xl shadow-md flex flex-col items-center text-center border border-gray-200">
                      
                        <p class="text-lg text-gray-700 mb-4 italic">
                            "Finally, an interview prep tool that truly understands my needs. The tailored questions gave me immense confidence."
                        </p>
                        <div class="flex text-yellow-400 mb-2">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                        </div>
                        <p class="font-semibold text-[#1F2937]">- Sarah Lee, Product Designer</p>
                    </div>
                </div>
            </div>
        </section>



 <section id="faq" className="py-10 md:py-20 bg-white">
      <div className="container mx-auto md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1F2937]">Got Questions? We've Got Answers.</h2>
        <p className=" text-gray-600 mb-8 md:mb-16 max-w-3xl mx-auto">
          Find quick answers to the most common questions about InterviewWise AI.
        </p>

        <div className="max-w-3xl mx-auto">
          {faqItems.map(item => (
            <div key={item.id} className="border-b border-gray-200 py-3 md:py-5 mt-3 ">
              <button
                className="flex cursor-pointer justify-between items-center w-full text-left focus:outline-none"
                onClick={() => toggleAccordion(item.id)}
              >
                <h3 className="text-lg pr-5 font-semibold text-[#1F2937]">{item.question}</h3>
                <span className="text-gray-500 text-2xl">
                  {openFAQ[item.id] ? '-' : '+'}
                </span>
              </button>
              <div
                id={`${item.id}-content`} // Keep ID if you need it for other purposes, though not strictly needed for this toggle
                className={`
                  mt-4 text-gray-700 text-start overflow-hidden transition-all duration-500 ease-in-out
                  ${openFAQ[item.id] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                `}
                // max-h-[500px] is a safe large value. You can adjust if answers are longer/shorter.
                // opacity-0/100 adds a nice fade effect during transition
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    </div>



      {openAuthModal && (
        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setOpenAuthModal(false);
            setCurrentPage("login");
          }}
          hideHeader
        >
          <div>
            {currentPage === "login" && (
              <Login setCurrentPage={setCurrentPage} />
            )}
            {currentPage === "sign-up" && (
              <Signup setCurrentPage={setCurrentPage} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};
