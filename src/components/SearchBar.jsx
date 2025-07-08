import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <div className="flex items-center w-full md:w-auto">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Найти рецепт... 🔍"
          className="w-full pl-10 pr-4 py-2 rounded-full border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-800 placeholder-gray-500"
          aria-label="Поиск рецептов"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
      </div>
      <button
        onClick={handleSearch}
        className="ml-2 bg-orange-400 text-white px-4 py-2 rounded-full hover:bg-orange-500 transition-colors"
        aria-label="Найти"
      >
        Поиск
      </button>
    </div>
  );
}

export default SearchBar;