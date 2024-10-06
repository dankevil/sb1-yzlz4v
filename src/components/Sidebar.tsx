import React from 'react';
import { PlusCircle, Folder, LogOut, LogIn, User } from 'lucide-react';
import { useTopics } from '../hooks/useTopics';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

interface SidebarProps {
  selectedTopic: string | null;
  onSelectTopic: (topic: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedTopic, onSelectTopic }) => {
  const { topics, addTopic, updateTopic } = useTopics();
  const { isAuthenticated, logout } = useAuth();

  const handleAddTopic = () => {
    const name = prompt('Enter new topic name:');
    if (name) addTopic(name);
  };

  const handleEditTopic = (id: string, currentName: string) => {
    const newName = prompt('Enter new topic name:', currentName);
    if (newName && newName !== currentName) updateTopic(id, newName);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white p-4 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4 font-montserrat neon-glow">Galaxy Notes</h1>
      <div className="mb-4">
        <button
          onClick={handleAddTopic}
          className="flex items-center text-sm text-cyan-300 hover:text-cyan-200 transition-colors duration-200"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Topic
        </button>
      </div>
      <nav className="flex-grow overflow-y-auto">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            onDoubleClick={() => handleEditTopic(topic.id, topic.name)}
            className={`flex items-center w-full text-left py-2 px-4 rounded ${
              selectedTopic === topic.id ? 'bg-purple-700 neon-border' : 'hover:bg-purple-700'
            }`}
          >
            <Folder className="mr-2 h-4 w-4" />
            {topic.name}
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-purple-600">
        <Link to="/profile" className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-purple-700">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Link>
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-purple-700"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        ) : (
          <Link to="/login" className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-purple-700">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};