import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';

const SearchBar = ({ initialName = '', onSearch, categories, brands, types }) => {
  const [searchName, setSearchName] = useState(initialName);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const handleInputChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({
      name: searchName,
      category: selectedCategory ? selectedCategory.value : '',
      brand: selectedBrand ? selectedBrand.value : '',
      type: selectedType ? selectedType.value : '',
    });
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setSelectedBrand(null); // Reset brand when category is changed
    setSelectedType(null);  // Reset type when category is changed
    onSearch({
      name: searchName,
      category: selectedOption ? selectedOption.value : '',
      brand: '',
      type: '',
    });
  };

  const handleBrandChange = (selectedOption) => {
    setSelectedBrand(selectedOption);
    setSelectedType(null); // Reset type when brand is changed
    onSearch({
      name: searchName,
      category: selectedCategory ? selectedCategory.value : '',
      brand: selectedOption ? selectedOption.value : '',
      type: '',
    });
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
    onSearch({
      name: searchName,
      category: selectedCategory ? selectedCategory.value : '',
      brand: selectedBrand ? selectedBrand.value : '',
      type: selectedOption ? selectedOption.value : '',
    });
  };

  const formatOptionLabel = ({ label, imageUrl }) => (
    <div className="flex items-center">
      <img src={imageUrl} alt={label} className="w-6 h-6 md:w-10 md:h-10 rounded-full mr-2 md:mr-6" />
      <span>{label}</span>
    </div>
  );

  const uniqueCategories = Array.from(new Set(categories.map(item => item.name)))
    .map(name => categories.find(item => item.name === name));
    
  const uniqueBrands = Array.from(new Set(brands.map(item => item.name)))
    .map(name => brands.find(item => item.name === name));
    
  const uniqueTypes = Array.from(new Set(types));

  const categoryOptions = uniqueCategories.map(({ name, imageUrl }) => ({
    value: name,
    label: name,
    imageUrl: imageUrl
  }));

  const brandOptions = uniqueBrands.map(({ name, imageUrl }) => ({
    value: name,
    label: name,
    imageUrl: imageUrl
  }));

  const typeOptions = uniqueTypes.map(type => ({
    value: type,
    label: type,
    imageUrl: '/images/logo-muvausa-store.webp' // Use a default image for types
  }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-[64px] z-40 mb-4 px-4 pb-4 md:pt-4 bg-utama shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="md:mx-20 flex flex-col md:flex-row items-center"
      >
        <div className="relative w-full flex items-center">
          <button
            type="button"
            onClick={() => setIsPopupVisible(!isPopupVisible)}
            className="bg-blue-500 text-white px-2 md:px-4 py-2 text-xs md:text-base rounded-l-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md flex items-center"
          >
            Kategori
            {isPopupVisible ? (
              <svg className="w-3 h-3 md:w-5 md:h-5 text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m5 15 7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-3 h-3 md:w-5 md:h-5 text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m19 9-7 7-7-7" />
              </svg>
            )}
          </button>

          <input
            type="text"
            value={searchName}
            onChange={handleInputChange}
            placeholder="Cari produk..."
            className="w-full text-xs md:text-base bg-white border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-2 md:px-4 py-2 transition duration-300 ease-in-out shadow-sm"
          />
          <button
            type="submit"
            className="text-xs md:text-base bg-blue-500 text-white px-2 md:px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>

        {isPopupVisible && (
          <div className="absolute top-full left-0 w-full z-50 md:px-24">
            <div ref={popupRef} className="p-4 border bg-white border-gray-300 shadow-lg rounded-lg w-full z-50">
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                options={categoryOptions}
                isClearable
                placeholder="Cari kategori . . ."
                className="text-xs md:text-lg mb-2 md:py-1"
                formatOptionLabel={formatOptionLabel}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: '#f3f4f6',
                    borderColor: 'transparent',
                    '&:hover': { borderColor: '#0055bb' },
                    boxShadow: 'none',
                    transition: 'border-color 0.3s ease-in-out',
                    padding: '2px',
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100,
                  }),
                }}
              />

              <Select
                value={selectedBrand}
                onChange={handleBrandChange}
                options={brandOptions}
                isClearable
                placeholder="Cari brand . . ."
                className="text-xs md:text-lg mb-2 md:py-1"
                formatOptionLabel={formatOptionLabel}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: '#f3f4f6',
                    borderColor: 'transparent',
                    '&:hover': { borderColor: '#0055bb' },
                    boxShadow: 'none',
                    transition: 'border-color 0.3s ease-in-out',
                    padding: '2px',
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100,
                  }),
                }}
              />

              <Select
                value={selectedType}
                onChange={handleTypeChange}
                options={typeOptions}
                isClearable
                placeholder="Cari tipe . . ."
                className="text-xs md:text-lg mb-2 md:py-1"
                formatOptionLabel={formatOptionLabel}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: '#f3f4f6',
                    borderColor: 'transparent',
                    '&:hover': { borderColor: '#0055bb' },
                    boxShadow: 'none',
                    transition: 'border-color 0.3s ease-in-out',
                    padding: '2px',
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100,
                  }),
                }}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
