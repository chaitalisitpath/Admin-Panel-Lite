import React, { useEffect, useState } from 'react'
import AdminsideBar from '../../../components/AdminsideBar'
import { Icon } from '../../../constants/icon';

function index() {
  const [tasks, settasks] = useState([]);
  const [modal, showModal] = useState(false);
  const [editModal, showeditModal] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [users, setUser] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data =>setUser(data.filter(u => u.username !== 'admin')));
  }, []);

  const openEditModal = (id) => {
    const task = tasks.find(t => t.id === id);
    setEditTask(task);
    showeditModal(true);
  };

  const openModal = (id) => {
    setdeleteId(id);
    showModal(true);
  };

  const closeModal = () => {
    showModal(false);
    showeditModal(false);
    setEditTask(null);
  };
  // const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });

  // const showSnackbar = (message, type = 'success') => {
  //   setSnackbar({ open: true, message, type });
  //   setTimeout(() => setSnackbar({ open: false, message: '', type: '' }), 160000);
  // };
  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => settasks(data));
  }, []);

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/tasks/${deleteId}`, { method: 'DELETE' });
    settasks(tasks.filter(task => task.id !== deleteId));
    // showSnackbar('Task deleted successfully!', 'success');
    closeModal();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/tasks/${editTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editTask)
    });
    // Update tasks in state
    settasks(tasks.map(task => (task.id === editTask.id ? editTask : task)));
    // showSnackbar('Task updated successfully!', 'success');
    closeModal();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Snackbar */}
      {/* {snackbar.open && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 text-white transition
    ${snackbar.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {snackbar.message}
        </div>
      )} */}
      <div className="flex flex-wrap w-full min-h-screen bg-gray-800">
        <AdminsideBar />
        <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
          <div className="w-full max-w-8xl bg-gray-900 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Task List</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full text-white border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-700">
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
                      <td colSpan={7} className="text-center py-8 text-gray-400">
                        No tasks found.
                      </td>
                    </tr>
                  ) : (
                    tasks.map(task => (
                      <tr
                        key={task.id}
                        className="bg-gray-700 hover:bg-gray-600 transition rounded-lg"
                      >
                        <td className="py-3 px-4 rounded-l-lg text-center">{task.title}</td>
                        <td className="py-3 px-4 text-center">{task.description}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${task.priority === 'High'
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
                          <Icon name="edit" size={20} onClick={() => openEditModal(task.id)} />
                          <Icon name="delete" size={20} onClick={() => openModal(task.id)} />
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
              <p>Are you sure you want to delete this task?</p>
              <div className='flex gap-5'>
                <button className='bg-red-700 text-white p-2 rounded-sm' onClick={handleDelete}>Delete</button>
                <button className='bg-gray-700 text-white p-2 rounded-sm' onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModal &&  (
          <div className='fixed inset-0 flex justify-center items-center bg-white/50'>
            <div className="bg-gray-800 w-full max-w-xl rounded-lg shadow-lg p-8">
              <h1 className='text-3xl font-bold text-center text-white mb-8'>Edit Task</h1>
              <form onSubmit={handleEditSubmit}>
                <div className="space-y-5">
                  <input
                    type="text"
                    name="title"
                    placeholder='Enter title'
                    value={editTask.title}
                    onChange={handleEditChange}
                    required
                    className="w-full bg-gray-700 text-white border border-[#1e3a4c] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-gray-400"
                  />
                  <textarea
                    name="description"
                    rows="3"
                    placeholder="Enter Description"
                    className="w-full bg-gray-700 text-white border border-[#1e3a4c] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder-gray-400"
                    value={editTask.description}
                    onChange={handleEditChange}
                    required
                  ></textarea>
                  <div className='flex flex-col md:flex-row gap-5'>
                    <select
                      name="priority"
                      className='w-full md:w-1/3 bg-gray-700 text-white border border-[#1e3a4c] rounded-md p-3 focus:outline-none'
                      value={editTask.priority}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Set Priority</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                    <select
                      name="AssignedTo"
                      className='w-full md:w-1/3 bg-gray-700 text-white border border-[#1e3a4c] rounded-md p-3 focus:outline-none'
                      value={editTask.AssignedTo}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Assign To</option>
                      {users.map(user =>(
                        <option key={user.id} value={user.fullname}>{user.fullname}</option>
                      ))}
                    </select>
                    <select
                      name="category"
                      className='w-full md:w-1/3 bg-gray-700 text-white border border-[#1e3a4c] rounded-md p-3 focus:outline-none'
                      value={editTask.category}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Set Category</option>
                      <option>Development</option>
                      <option>Testing</option>
                      <option>Documentation</option>
                    </select>
                  </div>
                  <div className="flex flex-col md:flex-row items-center text-white gap-4">
                    <label className=' md:w-1/4'>Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={editTask.dueDate}
                      onChange={handleEditChange}
                      required
                      className="w-full md:w-3/4 bg-gray-700 text-white border border-[#1e3a4c] rounded-md p-3 focus:outline-none"
                    />
                  </div>
                  <div className='flex gap-5'>
                    <button type="submit" className='w-full bg-amber-700 hover:bg-amber-600 text-white font-semibold py-3 rounded-md transition'>
                      Submit
                    </button>
                    <button type="button" onClick={closeModal} className='w-full bg-amber-700 hover:bg-amber-600 text-white font-semibold py-3 rounded-md transition'>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default index