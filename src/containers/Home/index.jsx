import React from 'react'
import { Link } from 'react-router-dom'

function index() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800">
        <div className="bg-gray-800 backdrop-blur-md rounded-xl shadow-2xl p-10 flex flex-col items-center max-w-lg w-full">
          <h1 className="text-4xl font-bold text-white mb-4 text-center drop-shadow-lg">Welcome to Admin Panel Lite</h1>
          <p className="text-lg text-gray-200 mb-8 text-center">
            Manage your tasks and users efficiently with a modern, lightweight admin dashboard.
          </p>
          <Link
            to="/login"
            className="bg-amber-700 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-md text-xl shadow transition"
          >
            Go to Login Page
          </Link>
        </div>
        <footer className="mt-10 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Admin Panel Lite. All rights reserved.
        </footer>
      </div>
    </>
  )
}

export default index