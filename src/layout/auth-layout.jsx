import { Outlet } from 'react-router-dom'
import logo from '../assets/white-logo-admin.png'

const AuthLayout = ({ children }) => {
  return (
    <div className='bg-gray-900 h-screen w-full flex justify-evenly items-center'>
      {/* first side for logo */}
      <div>
        <img src={logo} alt="Logo" className="w-80 h-auto" />
      </div>
      <div className="w-px h-[30rem] bg-gray-400 mx-8"></div>
      {/* Render children (e.g., login form) */}
      {children || <Outlet />}
    </div>
  )
}

export default AuthLayout