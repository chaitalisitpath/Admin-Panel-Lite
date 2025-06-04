import React from 'react'
import { Link } from 'react-router-dom'

function index() {
  return (
    <>
    <div className='flex justify-center items-center'>
        <Link to="/login" className="bg-amber-800 text-white rounded-sm p-3 text-xl">Go to Login Page</Link>
    </div>
    </>
  )
}

export default index