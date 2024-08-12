// import React, { useState } from 'react';

// const SearchBar = ({ initialName, initialCategory, initialBrand, initialType, onSearch }) => {
//   const [name, setName] = useState(initialName || '');
//   const [category, setCategory] = useState(initialCategory || '');
//   const [brand, setBrand] = useState(initialBrand || '');
//   const [type, setType] = useState(initialType || '');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch({ name, category, brand, type });
//   };

//   return (
//     <div className="mb-6">
//       <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
//         <input
//           type="text"
//           placeholder="Nama Produk"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Kategori"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Brand"
//           value={brand}
//           onChange={(e) => setBrand(e.target.value)}
//           className="p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Type"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="p-2 border border-gray-300 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Cari
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchBar;
































import React, { useState } from 'react';

const SearchBar = ({ initialName = '', onSearch, brands }) => {
  const [searchName, setSearchName] = useState(initialName);
  const [selectedBrand, setSelectedBrand] = useState('');

  // Handle input change
  const handleInputChange = (event) => {
    setSearchName(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ name: searchName, brand: selectedBrand });
  };

  // Handle brand selection
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
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
          value={selectedBrand}
          onChange={handleBrandChange}
          className="bg-white border border-gray-300 rounded px-4 py-2 mb-2 md:mb-0 md:mr-2"
        >
          <option value="">Semua Merek</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
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