import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../../supabaseClient"; // Import Supabase client

const UpdatePriceList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false); // State untuk mengatur visibilitas harga dan SKU
  const [targetId, setTargetId] = useState(""); // State untuk menyimpan id tujuan

  useEffect(() => {
    const fetchPriceList = async () => {
      try {
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
        .from("price_list")
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
      return {
        ...product,
        sell_price: match ? match.sell_price : product.sell_price, // Gunakan harga dari Supabase jika ada, jika tidak gunakan harga dari API
      };
    });
  };

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

  const mapToNumeric = (char) => {
    if (/[0-9]/.test(char)) return char; // Jika sudah angka, kembalikan langsung
    if (/[a-zA-Z]/.test(char)) return char.toLowerCase().charCodeAt(0) - 96; // Ubah huruf jadi angka (a=1, z=26)
    return char.charCodeAt(0) % 10; // Ubah simbol jadi angka dengan modulus 10
  };

  const generateReference = () => {
    const lastFourChars = targetId.slice(-4).split("").map(mapToNumeric).join(""); // Ambil 4 karakter terakhir dan ubah menjadi angka
    const date = new Date();
    const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(date.getSeconds()).padStart(2, "0")}`;
    return `${lastFourChars}${formattedDate}${formattedTime}`;
  };

  const copyToClipboard = (sku) => {
    if (!targetId) {
      alert("Silakan masukkan ID tujuan terlebih dahulu!");
      return;
    }
    const reference = generateReference();
    const formattedText = `${sku}.${targetId}.123456 R#${reference}`;
    navigator.clipboard.writeText(formattedText).then(() => {
      alert(`Berhasil disalin: ${formattedText}`);
    });
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
        className="sticky top-0 z-10 mb-4 p-2 border border-gray-300 rounded-md w-full bg-white"
      />

      {/* Input untuk mengisi ID tujuan */}
      <input
        type="text"
        placeholder="Masukkan ID tujuan"
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
        className="sticky top-12 z-10 mb-4 p-2 border border-gray-300 rounded-md w-full bg-white"
      />

      {/* Tombol untuk mengatur visibilitas harga dan SKU */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mb-4 p-2 bg-blue-500 text-white rounded-md"
      >
        {showDetails ? "Sembunyikan Detail" : "Tampilkan Detail"}
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
                onMouseDown={() => copyToClipboard(product.buyer_sku_code)} // Event untuk menyalin SKU dengan ID tujuan
              >
                <h2 className="text-xl font-semibold">{product.product_name}</h2>
                <p className="text-gray-600">{product.desc}</p>
                {/* Tampilkan harga dan SKU berdasarkan nilai showDetails */}
                {showDetails && (
                  <>
                    <p className="text-gray-800 font-bold">
                      Asli: Rp {product.price}
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
