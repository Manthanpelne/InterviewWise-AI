import React from 'react'
import { LuLinkedin } from 'react-icons/lu'

export const Footer = () => {
  return (
    <footer className="bg-black mt-20 text-white py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <h3 className="text-lg font-semibold">InterviewWise AI</h3>
        <p className="text-sm text-gray-400">&copy; 2025 All rights reserved.</p>
      </div>

      <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
        <a href="/about" className="text-gray-300 hover:text-white text-sm">About Us</a>
        <a href="/features" className="text-gray-300 hover:text-white text-sm">Features</a>
        <a href="/pricing" className="text-gray-300 hover:text-white text-sm">Pricing</a>
        <a href="/contact" className="text-gray-300 hover:text-white text-sm">Contact</a>
        <a href="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a>
        <a href="/terms" className="text-gray-300 hover:text-white text-sm">Terms of Service</a>
      </div>

      <div className="mt-4 md:mt-0 flex items-center space-x-4">
        <a href="https://twitter.com/your_ai_prep" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
          <svg fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.162 5.655a8.384 8.384 0 01-2.453.673 4.195 4.195 0 001.839-2.366 8.397 8.397 0 01-2.668 1.018 4.194 4.194 0 00-7.147 3.827 11.85 11.85 0 01-8.6-4.343 4.192 4.192 0 001.296 5.597 4.185 4.185 0 01-1.898-.523v.05a4.196 4.196 0 003.36 4.116 4.204 4.204 0 01-1.893.072 4.202 4.202 0 003.923 2.912 8.411 8.411 0 01-5.187 1.79 11.857 11.857 0 006.436 1.884c7.72 0 11.93-6.402 11.93-11.93s-.181-1.025-.04-1.53z"/>
          </svg>
        </a>
        <a href="https://linkedin.com/company/your-ai-prep" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
         <LuLinkedin className='text-xl'/>
        </a>
        </div>
    </div>
  </div>
</footer>
  )
}
