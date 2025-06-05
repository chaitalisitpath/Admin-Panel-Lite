import { NavLink, useNavigate } from "react-router-dom"
import { Icon } from '../../constants/icon'

const sideLinks = [
    { to: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { to: "/add-task", icon: "addUser", label: "Add Task" },
    { to: "/user-list", icon: "userList", label: "User List" }

]
const AdminsideBar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
}
return (
    <div className="bg-[#002428] text-white w-full lg:max-w-sm lg:h-screen p-5 text-2xl">
        <ul className="space-y-5 mt-5 flex flex-col max-w-sm">
            {sideLinks.map(link => (
                <li key={link.to}>
                    <NavLink to={link.to} className={({ isActive }) => `flex gap-3 items-center ${isActive ? "bg-white text-[#16283C] p-2 rounded-sm" : "bg-nonne"}`}><Icon name={link.icon} />{link.label}</NavLink>
                </li>
            ))}
            <li><NavLink onClick={(e) => {
                e.preventDefault();
                handleLogout(); 
            }} className="flex gap-2 items-center"><Icon name="logout"/>Logout</NavLink></li>
        </ul>
    </div>
);
 
};


export default AdminsideBar