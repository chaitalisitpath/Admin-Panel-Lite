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
              <input type="password" className="w-90 bg-white text-black h-10 p-3" placeholder='Enter Password' required ></input>
            </div>
            <div>
              <input type="password" className="w-90 bg-white text-black h-10 p-3" placeholder='Enter Confirm Password' required ></input>
            </div>

          </div>
          <button type="submit" className='bg-amber-700 w-60 h-10 mt-5 text-xl relative z-10 cursor-pointer rounded-sm'>Submit</button>
          <div className='mt-2'>
            <Link to="/">Remember Password ?</Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default index