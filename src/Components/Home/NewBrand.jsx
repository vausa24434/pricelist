import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';

const NewBrands = ({ onCategorySelect }) => {
    const [types, setTypes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTypesAndBrands = async () => {
            // Ambil 10 tipe terbaru dari tabel types
            const { data: typesData, error: typesError } = await supabase
                .from('types')
                .select('name, brand, created_at')
                .order('created_at', { ascending: false })
                .limit(10); // Batasi hasil ke 10 tipe terbaru

            if (typesError) {
                console.error('Error fetching types:', typesError);
                return;
            }

            // Ambil data gambar dari tabel brands berdasarkan brand
            const updatedTypes = await Promise.all(typesData.map(async (type) => {
                const { data: brandData, error: brandError } = await supabase
                    .from('brands')
                    .select('image')
                    .eq('name', type.brand)
                    .limit(1) // Ambil hanya satu baris data
                    .maybeSingle(); // Gunakan maybeSingle jika hasil bisa kosong
            
                if (brandError) {
                    console.error('Error fetching brand image:', brandError);
                    return { ...type, imageUrl: '/images/logo-muvausa-store.webp' }; // Gambar cadangan jika image tidak tersedia
                }
            
                return {
                    ...type,
                    imageUrl: brandData?.image || '/images/logo-muvausa-store.webp', // Gambar cadangan jika image tidak tersedia
                };
            }));
            

            setTypes(updatedTypes);
        };

        fetchTypesAndBrands();
    }, []);

    const handleTypeClick = (type, brand) => {
        if (onCategorySelect) {
            onCategorySelect({ type, brand });
        }
        navigate(`/search/?type=${encodeURIComponent(type)}&brand=${encodeURIComponent(brand)}`);
    };

    return (
        <div className="bg-gray-100 px-4">
            <div className="py-4 md:py-8 flex mx-0 sm:mx-20 items-center justify-center">
                {/* Section Types */}
                <section className="w-full">
                    <h1 className="text-md md:text-xl text-utama font-semibold">PRODUK TERBARU</h1>
                    <p className="text-xl md:text-4xl font-bold">
                        Produk Terbaru
                    </p>
                    {/* Container for scrolling types */}
                    <div className="overflow-x-auto py-8 md:py-8 scrollable-content">
                        <div className="flex flex-nowrap gap-12 md:gap-16 pb-10">
                            {types.map((type, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 flex flex-col items-center cursor-pointer w-24 h-24 md:w-36 md:h-36"
                                    onClick={() => handleTypeClick(type.name, type.brand)}
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={type.imageUrl}
                                            alt={type.name}
                                            className="w-full h-full object-cover rounded-full border-2 border-blue-600 p-1 shadow-md"
                                        />
                                    </div>
                                    <span className="text-sm md:text-base font-medium text-utama text-center mt-2 whitespace-normal break-words">
                                        {type.brand}
                                    </span>
                                    <span className="text-sm md:text-base font-medium text-gray-900 text-center mt-1 whitespace-normal break-words">
                                        {type.name}
                                    </span>
                                </div>
                            ))}
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

export default NewBrands;
