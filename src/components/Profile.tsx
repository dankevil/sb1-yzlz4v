import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
      <div className="bg-purple-800 p-8 rounded-lg shadow-lg neon-border w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white neon-glow font-montserrat">User Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-purple-700 border border-purple-600 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-purple-700 border border-purple-600 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-purple-800 transition-colors duration-200 neon-button"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};