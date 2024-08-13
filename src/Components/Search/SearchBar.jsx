// import React, { useState } from 'react';
// import Select from 'react-select';

// const SearchBar = ({ initialName = '', onSearch, categories, brands, types }) => {
//   const [searchName, setSearchName] = useState(initialName);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const [selectedType, setSelectedType] = useState(null);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);

//   const handleInputChange = (event) => {
//     setSearchName(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSearch({
//       name: searchName,
//       category: selectedCategory ? selectedCategory.value : '',
//       brand: selectedBrand ? selectedBrand.value : '',
//       type: selectedType ? selectedType.value : '',
//     });
//   };

//   const handleCategoryChange = (selectedOption) => {
//     setSelectedCategory(selectedOption);
//     setSelectedBrand(null); // Reset brand when category is cleared
//     setSelectedType(null);  // Reset type when category is cleared
//     onSearch({
//       name: searchName,
//       category: selectedOption ? selectedOption.value : '',
//       brand: '', // Reset brand
//       type: '',  // Reset type
//     });
//   };

//   const handleBrandChange = (selectedOption) => {
//     setSelectedBrand(selectedOption);
//     setSelectedType(null); // Reset type when brand is cleared
//     onSearch({
//       name: searchName,
//       category: selectedCategory ? selectedCategory.value : '',
//       brand: selectedOption ? selectedOption.value : '',
//       type: '', // Reset type
//     });
//   };

//   const handleTypeChange = (selectedOption) => {
//     setSelectedType(selectedOption);
//     onSearch({
//       name: searchName,
//       category: selectedCategory ? selectedCategory.value : '',
//       brand: selectedBrand ? selectedBrand.value : '',
//       type: selectedOption ? selectedOption.value : '',
//     });
//   };

//   const categoryOptions = categories.map((category) => ({
//     value: category,
//     label: category,
//   }));

//   const brandOptions = brands.map((brand) => ({
//     value: brand,
//     label: brand,
//   }));

//   const typeOptions = types.map((type) => ({
//     value: type,
//     label: type,
//   }));

//   return (
//     <div className="sticky top-[64px] z-40 mb-4 px-4 pb-6 md:py-5 md:pt-8 bg-utama shadow-lg">
//       <form
//         onSubmit={handleSubmit}
//         className="md:mx-20 flex flex-col md:flex-row items-center "
//       >
//         {/* Kolom Input Pencarian dengan Tombol Cari */}
//         <div className="relative w-full flex items-center">
//           {/* Tombol Kategori */}
//           <button
//             type="button"
//             onClick={() => setIsPopupVisible(!isPopupVisible)}
//             className="bg-blue-500 text-white px-4 py-2 rounded-l-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md flex items-center"
//           >
//             <svg
//               className="w-5 h-5 text-white mr-2"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Kategori
//           </button>

//           <input
//             type="text"
//             value={searchName}
//             onChange={handleInputChange}
//             placeholder="Cari produk..."
//             className="w-full bg-white border-t border-b border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 transition duration-300 ease-in-out shadow-sm"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
//           >
//             Cari
//           </button>
//         </div>

//         {/* Popup untuk Kategori, Brand, dan Type */}
//         {isPopupVisible && (
//           <div className="absolute top-full left-0 w-full z-50 md:px-24">
//             <div className="p-4 border bg-white border-gray-300 shadow-lg rounded-lg w-full z-50">
//               {/* Filter Kategori */}
//               <Select
//                 value={selectedCategory}
//                 onChange={handleCategoryChange}
//                 options={categoryOptions}
//                 isClearable
//                 placeholder="Cari kategori . . ."
//                 className="mb-2"
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     backgroundColor: '#f3f4f6',
//                     borderColor: 'transparent',
//                     '&:hover': { borderColor: '#0055bb' },
//                     boxShadow: 'none',
//                     transition: 'border-color 0.3s ease-in-out',
//                   }),
//                   menu: (base) => ({
//                     ...base,
//                     zIndex: 100,
//                   }),
//                 }}
//               />

//               {/* Filter Brand */}
//               <Select
//                 value={selectedBrand}
//                 onChange={handleBrandChange}
//                 options={brandOptions}
//                 isClearable
//                 placeholder="Cari brand . . ."
//                 className="mb-2"
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     backgroundColor: '#f3f4f6',
//                     borderColor: 'transparent',
//                     '&:hover': { borderColor: '#0055bb' },
//                     boxShadow: 'none',
//                     transition: 'border-color 0.3s ease-in-out',
//                   }),
//                   menu: (base) => ({
//                     ...base,
//                     zIndex: 100,
//                   }),
//                 }}
//               />

//               {/* Filter Type */}
//               <Select
//                 value={selectedType}
//                 onChange={handleTypeChange}
//                 options={typeOptions}
//                 isClearable
//                 placeholder="Cari type . . ."
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     backgroundColor: '#f3f4f6',
//                     borderColor: 'transparent',
//                     '&:hover': { borderColor: '#0055bb' },
//                     boxShadow: 'none',
//                     transition: 'border-color 0.3s ease-in-out',
//                   }),
//                   menu: (base) => ({
//                     ...base,
//                     zIndex: 100,
//                   }),
//                 }}
//               />
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SearchBar;














































import React, { useState } from 'react';
import Select from 'react-select';

const SearchBar = ({ initialName = '', onSearch, categories, brands, types }) => {
  const [searchName, setSearchName] = useState(initialName);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
    setSelectedBrand(null); // Reset brand when category is cleared
    setSelectedType(null);  // Reset type when category is cleared
    onSearch({
      name: searchName,
      category: selectedOption ? selectedOption.value : '',
      brand: '', // Reset brand
      type: '',  // Reset type
    });
  };

  const handleBrandChange = (selectedOption) => {
    setSelectedBrand(selectedOption);
    setSelectedType(null); // Reset type when brand is cleared
    onSearch({
      name: searchName,
      category: selectedCategory ? selectedCategory.value : '',
      brand: selectedOption ? selectedOption.value : '',
      type: '', // Reset type
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

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  const brandOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const typeOptions = types.map((type) => ({
    value: type,
    label: type,
  }));

  return (
    <div className="sticky top-[64px] z-40 mb-4 px-4 pb-3 md:pb-6 md:py-5 md:pt-8 bg-utama shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="md:mx-20 flex flex-col md:flex-row items-center "
      >
        {/* Kolom Input Pencarian dengan Tombol Cari */}
        <div className="relative w-full flex items-center">
          {/* Tombol Kategori */}
          <button
            type="button"
            onClick={() => setIsPopupVisible(!isPopupVisible)}
            className="bg-blue-500 text-white px-2 md:px-4 py-2 text-xs md:text-base rounded-l-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md flex items-center"
          >
            Kategori
            {isPopupVisible ? (
              // Ikon Panah Atas ketika popup terlihat
              <svg className="w-3 h-3 md:w-5 md:h-5 text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m5 15 7-7 7 7" />
              </svg>


            ) : (
              // Ikon Grid ketika popup tidak terlihat

              <svg className="w-3 h-3 md:w-5 md:h-5 text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 9-7 7-7-7" />
              </svg>
            )}

          </button>


          <input
            type="text"
            value={searchName}
            onChange={handleInputChange}
            placeholder="Cari produk..."
            className="w-full text-xs md:text-base bg-white  border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-2 md:px-4 py-2 transition duration-300 ease-in-out shadow-sm"
          />
          <button
            type="submit"
            className="text-xs md:text-base bg-blue-500 text-white px-2 md:px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
          >
              <svg className="w-4 h-4 md:w-6 md:h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>

        {/* Popup untuk Kategori, Brand, dan Type */}
        {isPopupVisible && (
          <div className="absolute top-full left-0 w-full md:w-1/3 z-50 md:px-24">
            <div className="p-4 border bg-white border-gray-300 shadow-lg rounded-lg w-full z-50">
              {/* Filter Kategori */}
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                options={categoryOptions}
                isClearable
                placeholder="Cari kategori . . ."
                className="text-xs md:text-base mb-2 md:py-1"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: '#f3f4f6',
                    borderColor: 'transparent',
                    '&:hover': { borderColor: '#0055bb' },
                    boxShadow: 'none',
                    transition: 'border-color 0.3s ease-in-out',
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100,
                  }),
                }}
              />

              {/* Filter Brand */}
              <Select
                value={selectedBrand}
                onChange={handleBrandChange}
                options={brandOptions}
                isClearable
                placeholder="Cari brand . . ."
                className="text-xs md:text-base mb-2 md:py-1"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: '#f3f4f6',
                    borderColor: 'transparent',
                    '&:hover': { borderColor: '#0055bb' },
                    boxShadow: 'none',
                    transition: 'border-color 0.3s ease-in-out',
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100,
                  }),
                }}
              />

              {/* Filter Type */}
              <Select
                value={selectedType}
                onChange={handleTypeChange}
                options={typeOptions}
                isClearable
                placeholder="Cari type . . ."
                className="text-xs md:text-base mb-2 md:py-1"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: '#f3f4f6',
                    borderColor: 'transparent',
                    '&:hover': { borderColor: '#0055bb' },
                    boxShadow: 'none',
                    transition: 'border-color 0.3s ease-in-out',
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
