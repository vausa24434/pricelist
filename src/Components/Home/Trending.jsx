// import React, { useState } from 'react';

// export default function Trending() {
//   const [selectedCategory, setSelectedCategory] = useState('All categories');

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const categories = [
//     'All categories',
//     ''Paket Data'',
//     ''Top Up Game'',
//     ''Voucher Data'',
//     ''Voucher Game'',
//   ];

//   const images = {
//     'All categories': [
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
//     ],
//     'Paket Data': [
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
//     ],
//     'Top Up Game': [
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
//     ],
//     'Voucher Data': [
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
//     ],
//     'Voucher Game': [
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
//       'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
//     ],
//   };

//   return (
//     <div className="bg-white">
//       <div className="py-8 md:py-20 mx-0 sm:mx-20 items-center justify-center">
//         <h1 className="text-md md:text-xl text-utama font-semibold">BANYAK DICARI</h1>
//         <p className="text-xl md:text-4xl font-bold">Banyak Dicari Minggu Ini</p>

//         {/* Category Buttons */}
//         <div className="flex py-4 md:py-8 flex-wrap">
//           {categories.map((category) => (
//             <button
//               key={category}
//               type="button"
//               className={`${
//                 selectedCategory === category
//                   ? 'text-white bg-blue-700 border border-blue-600'
//                   : 'text-blue-700 bg-white border border-blue-600 hover:text-white hover:bg-blue-700'
//               } rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-900 dark:border-gray-900 dark:text-white dark:hover:bg-blue-500 dark:hover:border-blue-500`}
//               onClick={() => handleCategoryClick(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Image Gallery */}
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//           {images[selectedCategory].map((image, index) => (
//             <div key={index}>
//               <img className="h-auto max-w-full rounded-lg" src={image} alt="" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
























import React, { useState } from 'react';

export default function Trending() {
  const [selectedCategory, setSelectedCategory] = useState('Pulsa');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const categories = [
    'Pulsa',
    'Paket Data',
    'Top Up Game',
    'Voucher Data',
    'Voucher Game',
  ];

  const images = {
    Pulsa: [
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
    ],
    'Paket Data': [
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
    ],
    'Top Up Game': [
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
    ],
    'Voucher Data': [
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
    ],
    'Voucher Game': [
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
      'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
    ],
  };

  return (
    <div className="bg-white px-4">
      <div className="py-8 md:py-16 mx-0 sm:mx-20 items-center justify-center">
        <h1 className="text-md md:text-xl text-utama font-semibold">BANYAK DICARI</h1>
        <p className="text-xl md:text-4xl font-bold">Banyak Dicari Minggu Ini</p>

        {/* Category Buttons - Horizontal Scroll */}
        <div className="flex overflow-x-auto py-4 md:py-8 space-x-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${
                selectedCategory === category
                  ? 'text-white bg-blue-700 border border-blue-600'
                  : 'text-blue-700 bg-white border border-blue-600 hover:text-white hover:bg-blue-700'
              } rounded-full text-base font-medium px-5 py-2.5 text-center whitespace-nowrap focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-900 dark:border-gray-900 dark:text-white dark:hover:bg-blue-500 dark:hover:border-blue-500`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {images[selectedCategory].map((image, index) => (
            <div key={index}>
              <img className="h-auto max-w-full rounded-lg" src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
