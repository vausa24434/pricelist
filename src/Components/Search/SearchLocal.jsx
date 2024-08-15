import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../../../supabaseClient';
import SearchBar from './SearchBar';

const SearchLocal = () => {
  const location = useLocation();
  const { searchTerm = '', category = '' } = location.state || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;

  // State for search parameters
  const [searchName, setSearchName] = useState(searchTerm || '');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // State for available categories, brands, and types
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchAndUpdatePriceList = async () => {
      try {
        setLoading(true);

        // Fetch data from external API
        const username = import.meta.env.VITE_USERNAME;
        const sign = import.meta.env.VITE_SIGN;

        const response = await axios.post(
          "http://localhost:3001/price-list",
          {
            cmd: "prepaid",
            username: username,
            code: "",
            sign: sign,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const productsData = response.data.data;

        // Save data to Supabase
        await saveProductsToSupabase(productsData);

        // Fetch updated price list from Supabase
        await fetchProducts();
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch price list.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndUpdatePriceList();
  }, []);

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, []);

  useEffect(() => {
    fetchBrands(); // Fetch brands based on selected category
  }, [selectedCategory]);

  useEffect(() => {
    fetchTypes(); // Fetch types based on selected brand
  }, [selectedBrand]);

  // Reset currentPage to 1 when search parameters change
  useEffect(() => {
    fetchProducts(); // Fetch products when search parameters change
  }, [currentPage, searchName, selectedCategory, selectedBrand, selectedType]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('price_list')
        .select('category, category_image')
        .neq('category', '')
        .order('category', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories.');
        return;
      }

      const uniqueCategories = Array.from(new Set(data.map(item => ({
        name: item.category,
        imageUrl: item.category_image || '/images/logo-muvausa-store.webp',
      }))));
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch categories.');
    }
  };

  const fetchBrands = async () => {
    if (!selectedCategory) {
      setBrands([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('price_list')
        .select('brand, brand_image')
        .eq('category', selectedCategory)
        .neq('brand', '')
        .order('brand', { ascending: true });

      if (error) {
        console.error('Error fetching brands:', error);
        setError('Failed to fetch brands.');
        return;
      }

      const uniqueBrands = Array.from(new Set(data.map(item => ({
        name: item.brand,
        imageUrl: item.brand_image || '/images/logo-muvausa-store.webp',
      }))));
      setBrands(uniqueBrands);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch brands.');
    }
  };

  const fetchTypes = async () => {
    if (!selectedBrand) {
      setTypes([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('price_list')
        .select('type')
        .eq('category', selectedCategory)
        .eq('brand', selectedBrand)
        .neq('type', '')
        .order('type', { ascending: true });

      if (error) {
        console.error('Error fetching types:', error);
        setError('Failed to fetch types.');
        return;
      }

      const uniqueTypes = Array.from(new Set(data.map(item => item.type)));
      setTypes(uniqueTypes);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch types.');
    }
  };

  const saveProductsToSupabase = async (products) => {
    try {
      const uniqueProducts = products.reduce((acc, current) => {
        const x = acc.find(item => item.product_name === current.product_name);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      const { data, error } = await supabase
        .from("products")
        .upsert(uniqueProducts, {
          onConflict: ['product_name'],
        });

      if (error) {
        console.error("Error upserting data");
        setError("Failed to save products.");
      } else {
        console.log("Data successfully upserted");
      }
    } catch (error) {
      console.error("Error upserting data", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    let countQuery = supabase.from('price_list').select('*', { count: 'exact' });

    if (searchName) {
      countQuery = countQuery.ilike('product_name', `%${searchName}%`);
    }
    if (selectedCategory) {
      countQuery = countQuery.eq('category', selectedCategory);
    }
    if (selectedBrand) {
      countQuery = countQuery.eq('brand', selectedBrand);
    }
    if (selectedType) {
      countQuery = countQuery.eq('type', selectedType);
    }

    const { count: totalCount, error: countError } = await countQuery;

    if (countError) {
      console.error('Error fetching total count:', countError);
      setError(countError.message);
      setLoading(false);
      return;
    }

    const totalPageCount = Math.ceil(totalCount / productsPerPage);
    setTotalPages(totalPageCount);

    let query = supabase.from('price_list').select('*');

    if (searchName) {
      query = query.ilike('product_name', `%${searchName}%`);
    }
    if (selectedCategory) {
      query = query.eq('category', selectedCategory);
    }
    if (selectedBrand) {
      query = query.eq('brand', selectedBrand);
    }
    if (selectedType) {
      query = query.eq('type', selectedType);
    }

    query = query.order('created_at', { ascending: false });

    const from = (currentPage - 1) * productsPerPage;
    const to = from + productsPerPage - 1;
    query = query.range(from, to);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const productsCount = products.length;

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="bg-bg_utama min-h-screen">
      <SearchBar
        initialName={searchName}
        onSearch={({ name, category, brand, type }) => {
          setSearchName(name);
          setSelectedCategory(category);
          setSelectedBrand(brand);
          setSelectedType(type);
        }}
        categories={categories}
        brands={brands}
        types={types}
      />
      <div className="text-center mb-8">
        <h1 className="text-xl md:text-2xl font-bold">
          Hasil Pencarian
        </h1>
        <p className="text-base md:text-lg mt-2">{productsCount} produk ditemukan</p>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product bg-white shadow-lg rounded-lg overflow-hidden p-2"
            >
<Link 
  to={`/productlocal/${product.id}?category=${selectedCategory}&brand=${selectedBrand}&type=${selectedType}`}
>
                <img
                  className="w-full h-36 sm:h-48 md:h-64 border-b border-black pb-2 mb-2 object-cover object-center"
                  src={product.image_url || "/images/logo-muvausa-store.webp"}
                  alt={product.product_name}
                />
                <div className="p-2 md:p-4">
                  <h3 className="text-sm md:text-lg font-bold mb-1">
                    {(product.product_name)}
                  </h3>
                  <p className="text-gray-600">{product.desc}</p>
                  <p className="text-gray-800 font-bold">
                    Harga: Rp {product.sell_price ? product.sell_price.toLocaleString() : 'N/A'}
                  </p>
                  <p>Brand: {product.brand}</p>
                  <p>Kategori: {product.category}</p>
                  <p>Type: {product.type}</p>
                  <p>
                    Status: {product.product_status ? "Tersedia" : "Gangguan"}
                  </p>
                  <p>Support Multi Transaksi?: {product.multi ? "Ya" : "Tidak"}</p>
                  {product.cut_off_time && (
                    <p>Jam Cut-off: {product.cut_off_time}</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">Tidak ada produk yang ditemukan.</div>
      )}

      <div className="flex flex-col items-center my-16 space-y-2">
        <div className="flex flex-wrap items-center justify-center space-x-2 overflow-x-auto scrollbar-hide">
          {currentPage > 7 && (
            <>
              {Array.from({ length: 3 }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 md:px-3 md:py-2 border border-gray-300 text-xs md:text-sm ${currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-400">...</span>
            </>
          )}
          {generatePageNumbers().map((page) => {
            if (
              (page >= currentPage - 3 && page <= currentPage + 3) ||
              (currentPage <= 4 && page < 7) ||
              (currentPage > totalPages - 4 && page >= totalPages - 7)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 md:px-3 md:py-2 border border-gray-300 text-xs md:text-sm ${currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {page}
                </button>
              );
            }
            return null;
          })}
          {currentPage < totalPages - 6 && (
            <>
              <span className="text-gray-400">...</span>
              {Array.from({ length: 3 }, (_, i) => totalPages - 2 + i).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 md:px-3 md:py-2 border border-gray-300 text-xs md:text-sm ${currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {page}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchLocal;