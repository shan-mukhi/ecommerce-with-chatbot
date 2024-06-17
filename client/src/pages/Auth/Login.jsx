import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../features/Auth/AuthSlice.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/login`, formData);
      const { token, name, email } = response.data.data;
      
      toast.success('Logged In Successfully');
      
      dispatch(login({ token, name, email }));

      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Login error');
      }
    }
  };


    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                     <NavLink to="/forgot-password"
                            
                            className="bg-indigo-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 hover:bg-indigo-600"
                        >
                            Forgot Password
                        </NavLink>
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 hover:bg-indigo-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
