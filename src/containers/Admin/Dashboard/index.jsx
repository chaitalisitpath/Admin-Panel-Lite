import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function index() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [AssignedTo, setAssignedTo] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

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
      } else {
        setMessage('Failed to add task');
      }
    } catch {
      setMessage('Server error');
    }
  }

  return (
    <>
      <button type="button" onClick={handleLogout} className='bg-red-700 text-white rounded-sm p-3 cursor-pointer'>Logout</button>
      <div>
        <h1 className='text-2xl text-center'>Add task</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-center items-center'>
            <div className='p-5 space-y-5 w-1/2'>
              {message && <div className="text-green-500">{message}</div>}
              <input
                type="text"
                placeholder='Enter title'
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <textarea
                name="about"
                id="about"
                rows="3"
                placeholder="Enter Description"
                className="block w-full rounded-md bg-white"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              ></textarea>
              <div className='flex gap-10'>
                <select className='w-60' value={priority} onChange={e => setPriority(e.target.value)} required>
                  <option value="">Set Priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
                <select className='w-60' value={AssignedTo} onChange={e => setAssignedTo(e.target.value)} required>
                  <option value="">Assign To</option>
                  <option>Jeel</option>
                  <option>Fardin</option>
                  <option>Ajay</option>
                </select>
                <select className='w-60' value={category} onChange={e => setCategory(e.target.value)} required>
                  <option value="">Set Category</option>
                  <option>Development</option>
                  <option>Testing</option>
                  <option>Documentation</option>
                </select>
              </div>
              <label className='mr-5'>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                required
              />
              <button type="submit" className='bg-black p-3 text-white block mx-auto my-auto rounded-sm'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default index