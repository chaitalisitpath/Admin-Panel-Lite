import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

function index() {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, email, username, password, confirmpassword })
            });
            if (res.ok) {
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 60000);
            } else {
                setMessage('Registration failed. Try a different username.');
            }
        } catch {
            setMessage('Server error. Please try again later.');
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
                            <h1 className="text-3xl md:text-4xl font-bold">Register</h1>
                        </div>
                        <form onSubmit={handleRegister}>
                            <div className="space-y-5 mt-10">
                                {message && <div className="text-amber-400">{message}</div>}
                                <div>
                                    <input
                                        type="text"
                                        className="w-full sm:w-[15rem] md:w-[20.5rem] lg:w-[22rem] bg-white text-black h-10 p-3 rounded focus:outline-none"
                                        placeholder="Enter Full Name"
                                        value={fullname}
                                        onChange={e => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        className="w-full sm:w-[15rem] md:w-[20.5rem] lg:w-[22rem] bg-white text-black h-10 p-3 rounded focus:outline-none"
                                        placeholder="Enter Email Address"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="w-full sm:w-[15rem] md:w-[20.5rem] lg:w-[22rem] bg-white text-black h-10 p-3 rounded focus:outline-none"
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
                                <div>
                                    <input
                                        type="password"
                                        className="w-full h-10 bg-white text-black p-3 rounded focus:outline-none"
                                        placeholder="Enter Confirm Password"
                                        value={confirmpassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-amber-700 w-full h-10 mt-10 text-xl relative z-10 cursor-pointer rounded-sm hover:bg-amber-600"
                            >
                                Register
                            </button>
                            <div className="mt-2">
                                <Link to="/login" className="text-white hover:underline">
                                    Already registered ?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default index