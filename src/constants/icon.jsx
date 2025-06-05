import {
    FaTachometerAlt,
    FaPlus ,
    FaUsers ,
    FaSignOutAlt,
    FaEdit ,
    FaTrash 
}from 'react-icons/fa';

export const icons = {
    dashboard : FaTachometerAlt,
    addUser: FaPlus,
    userList: FaUsers,
    logout: FaSignOutAlt,
    edit: FaEdit,
    delete: FaTrash
}
export function Icon({ name, ...props }) {
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent  {...props} />;
}