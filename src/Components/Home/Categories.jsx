import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';

const Categories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('name, image')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      const uniqueCategories = data.map((category) => ({
        name: category.name,
        imageUrl: category.image || '/images/logo-muvausa-store.webp', // Gambar cadangan jika image tidak tersedia
      }));

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

  // Logika untuk menentukan tata letak berdasarkan jumlah kategori
  const isDesktop = window.innerWidth >= 1024; // Atur breakpoint sesuai kebutuhan
  const splitIndexDesktop = 18;
  const splitIndexMobile = 8;

  let topRow = [];
  let bottomRow = [];

  if (categories.length >= (isDesktop ? splitIndexDesktop : splitIndexMobile)) {
    const splitIndex = Math.ceil(categories.length / 2);
    topRow = categories.slice(0, splitIndex);
    bottomRow = categories.slice(splitIndex);
  } else {
    topRow = categories; // Semua kategori dalam satu baris jika kurang dari batas
  }

  return (
    <div className="bg-gray-100 px-4">
      <div className="py-4 md:py-8 flex mx-0 sm:mx-20 items-center justify-center">
        {/* Section Categories */}
        <section className="w-full">
          <h1 className="text-md md:text-xl text-utama font-semibold">KATEGORI PRODUK</h1>
          <p className="text-xl md:text-4xl font-bold">
            Kategori Produk
          </p>
          {/* Container for scrolling categories */}
          <div className="overflow-x-auto py-4 md:py-8 scrollable-content">
            <div className="flex flex-col pb-10">
              {/* Top Row */}
              <div className={`flex flex-nowrap gap-12 md:gap-16 ${categories.length < (isDesktop ? splitIndexDesktop : splitIndexMobile) ? '' : 'mb-14 md:mb-20'}`}>
                {topRow.map((category, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex flex-col items-center cursor-pointer w-12 h-12 md:w-24 md:h-24"
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
              {/* Bottom Row - Only show if there are enough categories */}
              {categories.length >= (isDesktop ? splitIndexDesktop : splitIndexMobile) && (
                <div className="flex flex-nowrap gap-12 md:gap-16">
                  {bottomRow.map((category, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 flex flex-col items-center cursor-pointer w-12 h-12 md:w-24 md:h-24"
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
              )}
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
