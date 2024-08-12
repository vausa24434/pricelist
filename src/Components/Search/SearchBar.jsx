import React, { useState } from 'react';

const SearchBar = ({ initialName = '', onSearch, categorys }) => {
  const [searchName, setSearchName] = useState(initialName);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Handle input change
  const handleInputChange = (event) => {
    setSearchName(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ name: searchName, category: selectedCategory });
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center">
        <input
          type="text"
          value={searchName}
          onChange={handleInputChange}
          placeholder="Cari produk..."
          className="bg-white border border-gray-300 rounded px-4 py-2 mb-2 md:mb-0 md:mr-2 flex-grow"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-white border border-gray-300 rounded px-4 py-2 mb-2 md:mb-0 md:mr-2"
        >
          <option value="">Semua Kategori</option>
          {categorys.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Cari
        </button>
      </form>
    </div>
  );
};

export default SearchBar;