import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/api';

// User roles object
const UserRole = {
  STUDENT: 'STUDENT',
  // ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
};

// Register component using functional component syntax
const Register: React.FC = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: UserRole.STUDENT 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  // Handle submit event of form
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Enable loading state
    try {
      const response = await registerUser(userData); 
      console.log('Registration Successful:', response.data);
      navigate('/login'); // Navigate to login page after successful registration
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Registration Error:', error.message);
        setError(error.message); // Set error message for display
      } else {
        console.error('Unexpected Error:', error);
        setError('An unexpected error occurred'); // Set generic error message
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-gradient-to-r from-opacity-green via-opacity-cream to-opacity-green h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto md:w-[30%]">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white bg-opacity-25 p-8 border-2 rounded-lg shadow-lg">
        <div className=" md:hidden container 2xl:flex justify-center items-center">
            <img src="../../public/assets/admin/logo.svg" width={200} height={200} alt="logo" />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              disabled={loading}
            >
              {Object.values(UserRole).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <div className="text-center mt-4">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-900 font-medium">Already registered? Log in here.</Link>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
