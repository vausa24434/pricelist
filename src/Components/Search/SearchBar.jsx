
import React, { useState, useEffect } from 'react';

const SearchBar = ({ initialName = '', onSearch, categories, brands, types }) => {
  const [searchName, setSearchName] = useState(initialName);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Handle input change
  const handleInputChange = (event) => {
    setSearchName(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ name: searchName, category: selectedCategory, brand: selectedBrand, type: selectedType });
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    onSearch({ name: searchName, category: newCategory, brand: '', type: '' });
  };

  // Handle brand selection
  const handleBrandChange = (event) => {
    const newBrand = event.target.value;
    setSelectedBrand(newBrand);
    onSearch({ name: searchName, category: selectedCategory, brand: newBrand, type: '' });
  };

  // Handle type selection
  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    onSearch({ name: searchName, category: selectedCategory, brand: selectedBrand, type: newType });
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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedBrand}
          onChange={handleBrandChange}
          className="bg-white border border-gray-300 rounded px-4 py-2 mb-2 md:mb-0 md:mr-2"
        >
          <option value="">Semua Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="bg-white border border-gray-300 rounded px-4 py-2 mb-2 md:mb-0 md:mr-2"
        >
          <option value="">Semua Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
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
