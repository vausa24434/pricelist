import React, { useState } from "react";
import axios from "axios";
import MD5 from "crypto-js/md5";

const TransactionLocal = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleTransaction = async () => {
    const username = import.meta.env.VITE_USERNAME;
    const apikey = import.meta.env.VITE_APIKEY;
    const ref_id = "test2";

    // Membuat string untuk MD5
    const stringToHash = `${username}${apikey}${ref_id}`;
    const sign = MD5(stringToHash).toString(); // Menghitung MD5 dan mengubah hasilnya menjadi string

    try {
      const response = await axios.post("http://localhost:3002/transaction", {
        username,
        apikey,
        buyer_sku_code: "xld10",
        customer_no: "087800001232",
        ref_id,
        sign,
      });
      setResponse(response.data);
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    }
  };

  return (
    <div className="mt-20">
      <button onClick={handleTransaction}>Submit Transaction</button>
      {response && <div>Response: {JSON.stringify(response, null, 2)}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default TransactionLocal;
