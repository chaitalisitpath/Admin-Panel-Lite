import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

function index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError('');
    try {
      const res = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`);
      const users = await res.json();
      if (users.length > 0) {
        if(users[0].username === 'admin')
        {
          localStorage.setItem('token', 'admin-token');
          navigate('/admin-dashboard');
        }
        else
        {
          localStorage.setItem('username', users[0].fullname);
          localStorage.setItem('token', 'user-token');
          navigate('/user-dashboard');
        }
      
      }
       else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <>
      <div
        id="seconddiv"
        className="flex justify-center items-center min-h-screen px-4"
      >
        <div className="w-full max-w-3xl p-8">
          <div className="text-white text-center">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Welcome</h1>
              <p className="text-lg md:text-2xl">Please login to your Dashboard</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5 mt-10">
                {error && <div className="text-red-400">{error}</div>}
                <div>
                  <input
                    type="text"
                    className="w-full bg-white text-black h-10 p-3 rounded focus:outline-none"
                    placeholder="Enter Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="w-full h-10 bg-white text-black p-3 rounded focus:outline-none"
                    placeholder="Enter Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                
              </div>
              <button
                type="submit"
                className="bg-amber-700 w-full h-10 mt-10 text-xl relative z-10 cursor-pointer rounded-sm hover:bg-amber-600"
              >
                Login
              </button>
            
              <div className="mt-2">
                <Link to="/register" className="text-white hover:underline">
                  Not registered ?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default index