import React, { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../../supabaseClient"; // Pastikan path sesuai

const PriceList = () => {
  const [priceList, setPriceList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndUpdatePriceList = async () => {
      try {
        setLoading(true);

        // Fetch data from external API
        const response = await axios.post(
          "/api/price-list",
          {
            cmd: "prepaid",
            username: VITE_REACT_APP_USERNAME,
            code: "",
            sign: VITE_REACT_APP_SIGN,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response data:", response.data);
        const productsData = response.data.data;

        // Save data to Supabase
        await saveProductsToSupabase(productsData);

        // Fetch updated price list from Supabase
        const { data, error } = await supabase.from("price_list").select("*");

        if (error) {
          console.error("Error fetching price list:", error);
          setError("Failed to fetch price list.");
        } else {
          setPriceList(data);
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch price list.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndUpdatePriceList();
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
      console.error("Error saving to Supabase:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Price List</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {priceList.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <h2 className="text-xl font-semibold">{product.product_name}</h2>
              <p className="text-gray-600">{product.desc}</p>
              <p className="text-gray-800 font-bold">
                Price: Rp {product.sell_price.toLocaleString()}
              </p>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
              <p>
                Status:{" "}
                {product.product_status ? "Available" : "Unavailable"}
              </p>
              <p>Support Multi?: {product.multi ? "Yes" : "No"}</p>
              {product.cut_off_time && (
                <p>Cut-off Time: {product.cut_off_time}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceList;
