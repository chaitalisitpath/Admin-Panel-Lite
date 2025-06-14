import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState('');
  const [logoutModal, showlogoutModal] = useState(false);
    const openLogoutModal = () => {
        showlogoutModal(true);
    }
    const closeModal = () => {
        showlogoutModal(false);
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        showlogoutModal(false);
        navigate('/login');
    }


  useEffect(() => {

    const storedUser = localStorage.getItem('username');
    setUsername(storedUser || '');
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);



  // Filter tasks assigned to the logged-in user
  const userTasks = tasks.filter(
    (task) => task.AssignedTo === username
  );

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-10 px-4 relative">
      
        <button
          className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow transition"
          onClick={openLogoutModal}
        >
          Logout
        </button>
        <h1 className='absolute top-6 left-6 text-white text-3xl font-bold'>Hello {username} 😊</h1>
        <div className="bg-gray-900 rounded-xl shadow-2xl p-10 w-full max-w-4xl mt-10">
          <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
            My Tasks
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full text-white border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-3 px-4 rounded-l-lg text-left">Title</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Priority</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 rounded-r-lg text-left">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {userTasks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      No tasks found.
                    </td>
                  </tr>
                ) : (
                  userTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="bg-gray-700 hover:bg-gray-600 transition rounded-lg"
                    >
                      <td className="py-3 px-4 rounded-l-lg">{task.title}</td>
                      <td className="py-3 px-4">{task.description}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            task.priority === 'High'
                              ? 'bg-red-600 text-white'
                              : task.priority === 'Medium'
                              ? 'bg-yellow-500 text-black'
                              : task.priority === 'Low'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-500 text-white'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">{task.category}</td>
                      <td className="py-3 px-4 rounded-r-lg">{task.dueDate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
         {/* modal  */}
        {logoutModal && (
          <div className='fixed inset-0 flex justify-center items-center bg-black/60 bg-opacity-40 z-50'>
            <div className='bg-white p-7 space-y-5 rounded-md'>
              <p>Are you sure you want to logout?</p>
              <div className='flex gap-5'>
                <button className='bg-red-700 text-white p-2 rounded-sm' onClick={handleLogout}>Logout</button>
                <button className='bg-gray-700 text-white p-2 rounded-sm' onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserDashboard