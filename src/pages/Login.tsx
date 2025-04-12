import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';

interface User {
  name: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === form.email && u.password === form.password);
    if (!user) {
      alert('Invalid credentials');
      return;
    }

    const session = {
      user,
      timestamp: Date.now()
    };
    localStorage.setItem('session', JSON.stringify(session));
    dispatch(loginUser(user));
    navigate('/dashboard');
  };

  // similar to Signup UI
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-blue-900 px-4">
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
      >
        Login
      </button>
    </form>
  </div>
);

};

export default Login;
