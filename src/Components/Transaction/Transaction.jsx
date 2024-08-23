import React, { useState } from "react";
import axios from "axios";

const TransactionComponent = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleTransaction = async () => {
    try {
      const response = await axios.post("http://localhost:3001/transaction", {
        username: "yitaxig4J76D",
        buyer_sku_code: "xld10",
        customer_no: "087800001232",
        ref_id: "test2",
        sign: "438480f0d83ba5eb44ec67271b7b4d21",
      });
      setResponse(response.data);
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleTransaction}>Submit Transaction</button>
      {response && <div>Response: {JSON.stringify(response, null, 2)}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default TransactionComponent;
