import React, { useEffect, useState } from 'react'
import AdminsideBar from '../../../components/AdminsideBar'
import { Icon } from '../../../constants/icon';

function index() {
  const [tasks, settasks] = useState([]);
  const [modal, showModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const openModal = (id) =>{
    setdeleteId(id);
    showModal(true);
  }
  const closeModal = () =>{
    showModal(false);
  }
  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => settasks(data));
  }, []);
const handleDelete = async () =>{
  await fetch(`http://localhost:5000/tasks/${deleteId}`,
    {method : 'DELETE'}

  );
  settasks(tasks.filter (tasks => tasks.id != deleteId));
  closeModal();

}
  return (
    <>
      <div className="flex flex-wrap w-full min-h-screen bg-[#00151f]">
        <AdminsideBar />
        <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
          <div className="w-full max-w-8xl bg-[#002428] rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Task List</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full text-white border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-[#01303f]">
                    <th className="py-3 px-4 rounded-l-lg">Title</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Assign To</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4 rounded-r-lg">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-400">
                        No tasks found.
                      </td>
                    </tr>
                  ) : (
                    tasks.map(task => (
                      <tr
                        key={task.id}
                        className="bg-[#01303f] hover:bg-[#01405a] transition rounded-lg"
                      >
                        <td className="py-3 px-4 rounded-l-lg text-center">{task.title}</td>
                        <td className="py-3 px-4 text-center">{task.description}</td>
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
                        <td className="py-3 px-4 text-center">{task.AssignedTo}</td>
                        <td className="py-3 px-4 text-center">{task.category}</td>
                        <td className="py-3 px-4 text-center">{task.dueDate}</td>
                        <td className="py-3 px-4 rounded-r-lg flex gap-5 justify-center items-center">
                          <Icon name="edit" size={20}></Icon>
                          <Icon name="delete" size={20}  onClick={()=>openModal(task.id)}></Icon>
                          </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* modal  */}
        {modal && (
            <div className='fixed inset-0 flex justify-center items-center bg-black/60 bg-opacity-40 z-50'>
                <div className='bg-white p-7 space-y-5 rounded-md'>
                  <p>Are you sure you want to delete ?</p>
                  <div className='flex gap-5'>
                    <button className='bg-red-700 text-white p-2 rounded-sm' onClick={handleDelete}>Delete</button>
                    <button className='bg-gray-700 text-white p-2 rounded-sm' onClick={closeModal}>Cancel</button>
                  </div>
                </div>
        </div>
        )}
      
      </div>
    </>
  );
}

export default index