// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../../supabaseClient';

// const Categories = ({ onCategorySelect }) => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const { data, error } = await supabase
//         .from('price_list')
//         .select('category, category_image')
//         .neq('category', '')
//         .order('category', { ascending: true });

//       if (error) {
//         console.error('Error fetching categories:', error);
//         return;
//       }

//       // Create unique categories array
//       const uniqueCategories = Array.from(
//         new Set(data.map((item) => item.category))
//       ).map((category) => {
//         const categoryData = data.find((item) => item.category === category);
//         return {
//           name: categoryData.category,
//           imageUrl: categoryData.category_image || '/images/logo-muvausa-store.webp',
//         };
//       });

//       setCategories(uniqueCategories);
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (category) => {
//     if (onCategorySelect) {
//       onCategorySelect({ category });
//     }
//     navigate(`/?category=${encodeURIComponent(category)}`);
//   };

//   // Divide categories into two rows
//   const splitIndex = Math.ceil(categories.length / 2);
//   const topRow = categories.slice(0, splitIndex);
//   const bottomRow = categories.slice(splitIndex);

//   return (
//     <div className="bg-gray-100">
//     <div className="py-20 flex mx-0 sm:mx-20  items-center justify-center">
//       {/* Section Categories */}
//       <section className="mb-8 w-full">
//       <h1 className="text-xl text-utama font-semibold">KATEGORI PRODUK</h1>
//                     <p className="text-4xl font-bold">
//                     Kategori Produk 
//                     </p>        {/* Container for scrolling categories */}
//         <div className="overflow-x-auto py-4 md:py-8  scrollable-content">
//           <div className="flex flex-col">
//             {/* Top Row */}
//             <div className="flex flex-nowrap gap-4 md:gap-16 mb-8 md:mb-12">
//               {topRow.map((category, index) => (
//                 <div
//                   key={index}
//                   className="flex-shrink-0 flex flex-col items-center cursor-pointer w-20 h-20 md:w-24 md:h-24 min-w-[5rem] min-h-[7rem]" // Adjust min height
//                   onClick={() => handleCategoryClick(category.name)}
//                 >
//                   <div className="relative w-full h-full">
//                     <img
//                       src={category.imageUrl}
//                       alt={category.name}
//                       className="w-full h-full object-cover rounded-full border-2 border-blue-600 p-1 shadow-md"
//                     />
//                   </div>
//                   <span className="text-xs md:text-sm font-medium text-gray-700 text-center mt-2 whitespace-normal break-words">
//                     {category.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             {/* Bottom Row */}
//             <div className="flex flex-nowrap gap-4 md:gap-16">
//               {bottomRow.map((category, index) => (
//                 <div
//                   key={index}
//                   className="flex-shrink-0 flex flex-col items-center cursor-pointer w-20 h-20 md:w-24 md:h-24 min-w-[5rem] min-h-[7rem]" // Adjust min height
//                   onClick={() => handleCategoryClick(category.name)}
//                 >
//                   <div className="relative w-full h-full">
//                     <img
//                       src={category.imageUrl}
//                       alt={category.name}
//                       className="w-full h-full object-cover rounded-full border-2 border-blue-600 p-1 shadow-md"
//                     />
//                   </div>
//                   <span className="text-xs md:text-sm font-medium text-gray-700 text-center mt-2 whitespace-normal break-words">
//                     {category.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//     <style>{`
//         /* Add this CSS to your global styles or a CSS module */
//         .scrollable-content {
//           scrollbar-width: none; /* For Firefox */
//         }

//         .scrollable-content::-webkit-scrollbar {
//           display: none; /* For WebKit browsers */
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Categories;



































import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';

const Categories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('price_list')
        .select('category, category_image')
        .neq('category', '')
        .order('category', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      // Create unique categories array
      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category))
      ).map((category) => {
        const categoryData = data.find((item) => item.category === category);
        return {
          name: categoryData.category,
          imageUrl: categoryData.category_image || '/images/logo-muvausa-store.webp',
        };
      });

      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect({ category });
    }
    navigate(`/?category=${encodeURIComponent(category)}`);
  };

  // Divide categories into two rows
  const splitIndex = Math.ceil(categories.length / 2);
  const topRow = categories.slice(0, splitIndex);
  const bottomRow = categories.slice(splitIndex);

  return (
    <div className="bg-gray-100 px-4">
      <div className="py-4 md:py-8 flex mx-0 sm:mx-20  items-center justify-center">
        {/* Section Categories */}
        <section className="w-full">
          <h1 className="text-md md:text-xl text-utama font-semibold">KATEGORI PRODUK</h1>
          <p className="text-xl md:text-4xl font-bold">
            Kategori Produk
          </p>        {/* Container for scrolling categories */}
          <div className="overflow-x-auto py-4 md:py-8 scrollable-content">
            <div className="flex flex-col pb-10">
              {/* Top Row */}
              <div className="flex flex-nowrap gap-12 md:gap-16 mb-16">
                {topRow.map((category, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex flex-col items-center cursor-pointer w-12 h-12 md:w-24 md:h-24" // Adjust min height
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover rounded-full border-2 border-blue-600 p-1 shadow-md"
                      />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-700 text-center mt-2 whitespace-normal break-words">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
              {/* Bottom Row */}
              <div className="flex flex-nowrap gap-12 md:gap-16">
                {bottomRow.map((category, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex flex-col items-center cursor-pointer w-12 h-12 md:w-24 md:h-24" // Adjust min height
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover rounded-full border-2 border-blue-600 p-1 shadow-md"
                      />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-700 text-center mt-2 whitespace-normal break-words">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <style>{`
        /* Add this CSS to your global styles or a CSS module */
        .scrollable-content {
          scrollbar-width: none; /* For Firefox */
        }

        .scrollable-content::-webkit-scrollbar {
          display: none; /* For WebKit browsers */
        }
      `}</style>
    </div>
  );
};

export default Categories;