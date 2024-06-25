import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const adminEmail = 'admin@mail.com';
    const adminPassword = 'admin';
    const teacherEmail = 'teacher@mail.com';
    const teacherPassword = 'teacher';

    let response;

    if (credentials.email === adminEmail && credentials.password === adminPassword) {
      response = { data: { token: 'fake-admin-token', role: 'ADMIN' } };
    } else if (credentials.email === teacherEmail && credentials.password === teacherPassword) {
      response = { data: { token: 'fake-teacher-token', role: 'TEACHER' } };
    } else {
      setError('Login failed: Invalid email or password.');
      console.error('Invalid login attempt:', credentials.email);
      return;
    }

    console.log('Login Successful:', response.data);
    localStorage.setItem('token', response.data.token); // Store the token securely
    localStorage.setItem('role', response.data.role); // Store the role

    navigate(response.data.role === 'ADMIN' ? '/admin' : '/teacher/:id');
  };

  return (
    <div className="bg-gradient-to-r from-opacity-green via-opacity-cream to-opacity-green h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white bg-opacity-25 rounded-lg shadow-lg md:w-[30%] md:max-h-[60%] border-2">
        <div className="mb-4">
          <div className="md:hidden container 2xl:flex justify-center items-center">
            <img src="../../public/assets/admin/logo.svg" width={200} height={200} alt="logo" />
          </div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Login
        </button>
        <div className="text-center mt-4">
          <Link to="/" className="text-indigo-600 hover:text-indigo-900 font-medium">
            back to the home page.
          </Link>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
