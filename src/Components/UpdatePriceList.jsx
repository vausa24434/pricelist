import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../../supabaseClient"; // Import Supabase client

const UpdatePriceList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPriceList = async () => {
      try {
        const response = await axios.post('/api/price-list', {
          cmd: 'prepaid',
          code: '', // Atau parameter lain yang dibutuhkan
        });

        console.log("Response data:", response.data);
        const productsData = response.data.data;
        setProducts(productsData);
        await saveProductsToSupabase(productsData);
      } catch (error) {
        console.error("Error fetching price list:", error);
        setError("Failed to fetch price list.");
      }
    };

    fetchPriceList();
  }, []);

  const saveProductsToSupabase = async (products) => {
    try {
      // Hapus duplikat berdasarkan product_name
      const uniqueProducts = products.reduce((acc, current) => {
        const x = acc.find((item) => item.product_name === current.product_name);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      const { data, error } = await supabase
        .from("products")
        .upsert(uniqueProducts, {
          onConflict: ["product_name"],
        });

      if (error) {
        console.error("Error upserting data to Supabase:", error);
        setError("Failed to save products to Supabase.");
      } else {
        console.log("Data successfully upserted into Supabase:", data);
      }
    } catch (error) {
      console.error("Error saving to Supabase:", error);
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Price List</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        Array.isArray(filteredProducts) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border"
              >
                <h2 className="text-xl font-semibold">{product.product_name}</h2>
                <p className="text-gray-600">{product.desc}</p>
                <p className="text-gray-800 font-bold">
                  Harga: Rp {product.price.toLocaleString()}
                </p>
                <p>SKU: {product.buyer_sku_code}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default UpdatePriceList;
