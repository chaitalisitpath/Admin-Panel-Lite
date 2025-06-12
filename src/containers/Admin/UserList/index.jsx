import React, { useEffect, useState } from 'react'
import AdminsideBar from '../../../components/AdminsideBar'

function index() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const nonAdminUsers = users.filter(user => user.username !== 'admin');

  return (
    <>
      <div className="flex flex-wrap w-full min-h-screen bg-gray-800">
        <AdminsideBar />
        <div className="flex-1 flex flex-col items-center py-10 px-4">
          <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
              Registered User List
            </h1>
            <div className="overflow-x-auto">
              <table className="min-w-full text-white border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-4 rounded-l-lg text-left">#</th>
                    <th className="py-3 px-4 text-left">User Name</th>
                    <th className="py-3 px-4 rounded-r-lg text-left">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {nonAdminUsers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-8 text-gray-400">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    nonAdminUsers.map((user, idx) => (
                      <tr
                        key={user.id}
                        className="bg-gray-700 hover:bg-gray-600 transition rounded-lg"
                      >
                        <td className="py-3 px-4 rounded-l-lg">{idx + 1}</td>
                        <td className="py-3 px-4">{user.fullname}</td>
                        <td className="py-3 px-4 rounded-r-lg">{user.email || <span className="italic text-gray-400">N/A</span>}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default index