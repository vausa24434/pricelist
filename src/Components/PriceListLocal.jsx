import React, { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../../supabaseClient"; // Pastikan path sesuai

const PriceListLocal = () => {
  const [priceList, setPriceList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndUpdatePriceList = async () => {
      try {
        setLoading(true);

        // Fetch data from external API
        const response = await axios.post(
          "http://localhost:3001/price-list",
          {
            cmd: "prepaid",
            username: process.env.VITE_USERNAME,
            code: "",
            sign: process.env.VITE_SIGN,
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
        console.log("Data successfully upserted");
      }
    } catch (error) {
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
                Harga: Rp {product.sell_price.toLocaleString()}
              </p>
              <p>Brand: {product.brand}</p>
              <p>Kategori: {product.category}</p>
              <p>
                Status:{" "}
                {product.product_status ? "Tersedia" : "Gangguan"}
              </p>
              <p>Support Multi Transaksi?: {product.multi ? "Ya" : "Tidak"}</p>
              {product.cut_off_time && (
                <p>Jam Cut-off: {product.cut_off_time}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceListLocal;
