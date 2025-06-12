import { NavLink, useNavigate } from "react-router-dom"
import { Icon } from '../../constants/icon'
import { useState } from "react";

const sideLinks = [
    { to: "/admin-dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "/add-task", icon: "addUser", label: "Add Task" },
    { to: "/user-list", icon: "userList", label: "User List" }

]

const AdminsideBar = () => {
    const [logoutModal, showlogoutModal] = useState(false);
    const openLogoutModal = () => {
        showlogoutModal(true);
    }
    const closeModal = () => {
        showlogoutModal(false);
    }
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        showlogoutModal(false);
        navigate('/login');
    }
    return (
        <>
            <div className="bg-gray-900 text-white w-full lg:max-w-sm lg:h-screen p-5 text-xl">
                <ul className="space-y-5 mt-5 flex flex-col max-w-sm">
                    {sideLinks.map(link => (
                        <li key={link.to}>
                            <NavLink to={link.to} className={({ isActive }) => `flex gap-3 items-center ${isActive ? "bg-white text-[#16283C] p-2 rounded-sm" : "bg-nonne"}`}><Icon name={link.icon} />{link.label}</NavLink>
                        </li>
                    ))}
                    <li><NavLink onClick={(e) => {
                        e.preventDefault();
                        openLogoutModal();
                    }} className="flex gap-2 items-center"><Icon name="logout" />Logout</NavLink></li>
                </ul>
            </div>
            {/* modal  */}
            {logoutModal && (
                <div className='fixed inset-0 flex justify-center items-center bg-black/60 bg-opacity-40 z-50'>
                    <div className='bg-white p-7 space-y-5 rounded-md'>
                        <p>Are you sure you want to logout ?</p>
                        <div className='flex gap-5'>
                            <button className='bg-red-700 text-white p-2 rounded-sm' onClick={handleLogout}>Logout</button>
                            <button className='bg-gray-700 text-white p-2 rounded-sm' onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

};


export default AdminsideBar