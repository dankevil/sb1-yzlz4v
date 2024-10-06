import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps {
  onSearch: (term: string) => void;
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-700 text-white placeholder-purple-300"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <SearchIcon size={20} />
      </button>
    </form>
  );
};