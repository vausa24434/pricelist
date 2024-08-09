// untuk localhost, dan harus run kodingan berikut pada folder /my-project/proxy-server/
// node server.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const PriceListLocal = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchPriceList = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/price-list",
          {
            cmd: "prepaid",
            username: "yitaxig4J76D",
            code: "",
            sign: "4c96f72a53964c6718243f913033a0b6",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response data:", response.data);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching price list:", error);
      }
    };
    
    fetchPriceList();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Price List</h1>
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
                <p className="text-gray-600">{product.desc}</p>
                <p className="text-gray-800 font-bold">
                  Price: Rp {product.price.toLocaleString()}
                </p>
                <p>SKU: {product.buyer_sku_code}</p>
                <p>Brand: {product.brand}</p>
                <p>Category: {product.category}</p>
                <p>Type: {product.type}</p>
                <p>Seller: {product.seller_name}</p>
                <p>Stock: {product.unlimited_stock ? "Unlimited" : product.stock}</p>
                <p>Product Status: {product.buyer_product_status ? "Available" : "Unavailable"}</p>
                <p>Seller Status: {product.seller_product_status ? "Available" : "Unavailable"}</p>
                <p>Multi: {product.multi ? "Yes" : "No"}</p>
                {product.start_cut_off && (
                  <p>Cut-off Time: {product.start_cut_off} - {product.end_cut_off}</p>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
  
};

export default PriceListLocal;