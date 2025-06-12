import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/react.svg'

function index() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-700 relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute left-1/4 top-10 w-72 h-72 bg-amber-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute right-1/4 bottom-10 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute left-1/2 top-1/2 w-40 h-40 bg-blue-400 opacity-10 rounded-full blur-2xl animate-bounce"></div>
        </div>
        <div className="relative z-10 bg-gray-900/90 rounded-3xl shadow-2xl p-12 flex flex-col items-center max-w-2xl w-full mt-20">
          {/* <img src={logo} alt="Logo" className="w-24 h-24 mb-6 animate-spin-slow" /> */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-amber-400 mb-4 text-center drop-shadow-lg tracking-tight">
            Admin Panel Lite
          </h1>
          <p className="text-2xl text-gray-200 mb-8 text-center font-semibold">
            Level up your productivity! <span className="inline-block animate-bounce">🚀</span>
          </p>
          {/* Gamified badges */}
          <div className="flex gap-4 mb-8">
            <div className="bg-gradient-to-tr from-amber-400 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg flex items-center gap-2">
              <span role="img" aria-label="trophy">🏆</span> Task Master
            </div>
            <div className="bg-gradient-to-tr from-blue-400 to-indigo-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg flex items-center gap-2">
              <span role="img" aria-label="star">⭐</span> User Pro
            </div>
          </div>
          <Link
            to="/login"
            className="bg-amber-700 hover:bg-amber-600 text-white font-extrabold px-12 py-4 rounded-2xl text-2xl shadow-xl transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400"
          >
            Start Your Quest
          </Link>
        </div>
        <footer className="mt-16 text-gray-300 text-lg font-semibold z-10">
          &copy; {new Date().getFullYear()} Admin Panel Lite. All rights reserved.
        </footer>
      </div>
      {/* Custom animation for logo */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 6s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </>
  )
}

export default index