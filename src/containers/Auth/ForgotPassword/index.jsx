import React from 'react'
import { Link } from "react-router-dom";
function index() {
  return (
    <div id="seconddiv" className=''>
      <div className='text-white text-center'>
        <div className='space-y-2'>
          <h1 className='text-4xl'>Forgot Password</h1>

        </div>

        <form>
          <div className='space-y-5 mt-10'>
            <div>
              <input type="text" className="w-full sm:w-[15rem] md:w-[20.5rem] lg:w-[22rem] bg-white text-black h-10 p-3 rounded focus:outline-none" placeholder='Enter Username' required ></input>
            </div>

          </div>
          <button type="submit" className='bg-amber-700 w-full sm:w-[15rem] md:w-[20.5rem] lg:w-[22rem] h-10 mt-5 text-xl hover:bg-amber-600 cursor-pointer rounded-sm'>Submit</button>
          <div className='mt-2'>
            <Link to="/">Remember Password ?</Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default index