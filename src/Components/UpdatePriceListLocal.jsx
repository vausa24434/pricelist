import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../../supabaseClient"; // Import Supabase client

const UpdatePriceList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

  useEffect(() => {
    const fetchPriceList = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3002/price-list",
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
        if (Array.isArray(productsData)) {
          const supabaseData = await fetchSupabaseData();
          const mergedProducts = mergeProducts(productsData, supabaseData);
          setProducts(mergedProducts);
          await saveProductsToSupabase(mergedProducts);
        } else {
          console.error("Unexpected data format:", productsData);
          setError("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching price list:", error);
        setError("Failed to fetch price list.");
      }
    };

    fetchPriceList();
  }, []);

  const fetchSupabaseData = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("buyer_sku_code, sell_price");

      if (error) {
        console.error("Error fetching data from Supabase:", error);
        return [];
      }

      return data;
    } catch (error) {
      console.error("Error fetching from Supabase:", error);
      return [];
    }
  };

  const mergeProducts = (apiProducts, supabaseData) => {
    return apiProducts.map((product) => {
      const match = supabaseData.find(
        (item) => item.buyer_sku_code === product.buyer_sku_code
      );
      console.log("Match found for product:", product.product_name, match); // Debugging output
      return {
        ...product,
        sell_price: match ? match.sell_price : product.sell_price,
      };
    });
  };

  const saveProductsToSupabase = async (products) => {
    try {
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

  const generateReference = () => {
    const lastFourChars = targetId.slice(-4);
    const date = new Date();
    const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(date.getSeconds()).padStart(2, "0")}`;
    return `${lastFourChars}${formattedDate}${formattedTime}`;
  };

  const copyToClipboard = (sku, productName, sellPrice = "Harga Tidak Tersedia") => {
    if (!targetId) {
      alert("Silakan masukkan ID tujuan terlebih dahulu!");
      return;
    }
    const reference = generateReference();
    const formattedText = `${sku}.${targetId}.123456 R#${reference}\n\n;${productName};Rp.${sellPrice}`;
    navigator.clipboard.writeText(formattedText).then(() => {
      alert(`Berhasil disalin:\n${formattedText}`);
    });
  };

  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) =>
      sortOrder === "asc"
        ? a.sell_price - b.sell_price
        : b.sell_price - a.sell_price
    );
    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Price List</h1>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="sticky top-0 z-10 mb-4 p-2 border border-gray-300 rounded-md w-full bg-white"
      />

      <input
        type="text"
        placeholder="Masukkan ID tujuan"
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
        className="sticky top-12 z-10 mb-4 p-2 border border-gray-300 rounded-md w-full bg-white"
      />

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mb-4 p-2 bg-blue-500 text-white rounded-md"
      >
        {showDetails ? "Sembunyikan Detail" : "Tampilkan Detail"}
      </button>

      <button
        onClick={handleSort}
        className="mb-4 ml-2 p-2 bg-green-500 text-white rounded-md"
      >
        {sortOrder === "asc" ? "Sort ke Harga Terendah" : "Sort ke Harga Tertinggi"}
      </button>

      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        Array.isArray(filteredProducts) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border cursor-pointer"
                onMouseDown={() => copyToClipboard(
                  product.buyer_sku_code,
                  product.product_name,
                  product.sell_price || "Harga Tidak Tersedia"
                )}
              >
                <h2 className="text-xl font-semibold">{product.product_name}</h2>
                <p className="text-gray-600">{product.desc}</p>
                <p className="text-gray-800 font-bold">Rp{product.sell_price}</p>
                {showDetails && (
                  <>
                    <p className="text-gray-800 font-bold">
                      Member price: Rp {product.price}
                    </p>
                    <p>SKU: {product.buyer_sku_code}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default UpdatePriceList;
