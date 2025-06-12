import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminsideBar from '../../../components/AdminsideBar';

function index() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [AssignedTo, setAssignedTo] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);


  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data.filter(u => u.username !== 'admin')));
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          priority,
          AssignedTo,
          category,
          dueDate
        })
      });
      if (res.ok) {
        setMessage('Task added successfully!');
        setTitle('');
        setDescription('');
        setPriority('');
        setAssignedTo('');
        setCategory('');
        setDueDate('');
      } else {
        setMessage('Failed to add task');
      }
    } catch {
      setMessage('Server error');
    }
  }

  return (
    <>
      <div className='flex flex-wrap w-full min-h-screen bg-gray-700'>
        <AdminsideBar />
        <div className='flex-1 max-w-full h-auto flex flex-col items-center justify-center px-4 py-10'>
          <div className="bg-gray-800 w-full max-w-xl rounded-lg shadow-lg p-8">
            <h1 className='text-3xl font-bold text-center text-white mb-8'>Add Task</h1>
            <form onSubmit={handleSubmit}>
              {message && <div className={`mb-4 text-center font-semibold ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{message}</div>}
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder='Enter title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full bg-gray-700 text-white border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder-gray-400"
                />
                <textarea
                  name="about"
                  id="about"
                  rows="3"
                  placeholder="Enter Description"
                  className="w-full bg-gray-700 text-white border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder-gray-400"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  
                ></textarea>
                <div className='flex flex-col md:flex-row gap-5'>
                  <select className='w-full md:w-1/3 bg-gray-700 text-white border border-gray-700 rounded-md p-3 focus:outline-none' value={priority} onChange={e => setPriority(e.target.value)} required>
                    <option value="">Set Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                  <select className='w-full md:w-1/3 bg-gray-700 text-white border border-gray-700 rounded-md p-3 focus:outline-none' value={AssignedTo} onChange={e => setAssignedTo(e.target.value)} required>
                    <option value="">Assign To</option>
                    {users.map(user => (
                      <option key={user.id} value={user.fullname}>{user.fullname}</option>
                    ))}
                  </select>
                  <select className='w-full md:w-1/3 bg-gray-700 text-white border border-gray-700 rounded-md p-3 focus:outline-none' value={category} onChange={e => setCategory(e.target.value)} required>
                    <option value="">Set Category</option>
                    <option>Development</option>
                    <option>Testing</option>
                    <option>Presentation</option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <label className='text-white md:w-1/4'>Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    required
                    className="w-full md:w-3/4 bg-gray-700 text-white border border-[#1e3a4c] rounded-md p-3 focus:outline-none"
                  />
                </div>
                <button type="submit" className='w-full bg-amber-700 hover:bg-amber-600 text-white font-semibold py-3 rounded-md transition'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default index