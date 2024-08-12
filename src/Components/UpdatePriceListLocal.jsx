// // untuk localhost, dan harus run kodingan berikut pada folder /my-project/proxy-server/
// // node server.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../../supabaseClient"; // Import Supabase client

const UpdatePriceListLocal = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPriceList = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/price-list",
          {
            cmd: "prepaid",
            username: import.meta.env.VITE_REACT_APP_USERNAME,
            code: "",
            sign: import.meta.env.VITE_REACT_APP_SIGN,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
        console.error("Error upserting data to Supabase:", error);
        setError("Failed to save products to Supabase.");
      } else {
        console.log("Data successfully upserted into Supabase:", data);
      }
    } catch (error) {
    }
  };
    

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Price List</h1>
      {error && <p className="text-red-500">{error}</p>}
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        Array.isArray(products) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, index) => (
              <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <h2 className="text-xl font-semibold">{product.product_name}</h2>
              <p>SKU: {product.buyer_sku_code}</p>
            </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default UpdatePriceListLocal;
