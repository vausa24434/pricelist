// import React, { useState } from 'react';
// import axios from 'axios';

// const Deposit = () => {
//   const [amount, setAmount] = useState('200000');
//   const [bank, setBank] = useState('BRI');
//   const [ownerName, setOwnerName] = useState('DANU TRIANGGORO');
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);

//   // Detail yang Anda berikan
//   const apiUrl = process.env.VITE_API_URL_D;
//   const username = process.env.VITE_USERNAME;
//   const sign = process.env.VITE_SIGN_D;

//   const handleDeposit = async () => {
//     const data = {
//       username: username,
//       amount: parseInt(amount, 10),
//       bank: bank,
//       owner_name: ownerName,
//       sign: sign,
//     };

//     try {
//       const result = await axios.post(`${apiUrl}`, data, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       setResponse(result.data.data);
//       setError(null);
//     } catch (err) {
//       console.error('Error making deposit:', err);
//       setError(err.response ? err.response.data.message : err.message);
//       setResponse(null);
//     }
//   };

//   return (
//     <div>
//       <h1>Deposit</h1>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <label>
//           Amount:
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Bank:
//           <select value={bank} onChange={(e) => setBank(e.target.value)} required>
//             <option value="">Select Bank</option>
//             <option value="BCA">BCA</option>
//             <option value="MANDIRI">MANDIRI</option>
//             <option value="BRI">BRI</option>
//             <option value="BNI">BNI</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           Owner Name:
//           <input
//             type="text"
//             value={ownerName}
//             onChange={(e) => setOwnerName(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <button type="button" onClick={handleDeposit}>Make Deposit</button>
//       </form>

//       {response && (
//         <div>
//           <h2>Deposit Successful</h2>
//           <p><strong>Response Code:</strong> {response.rc}</p>
//           <p><strong>Amount:</strong> {response.amount}</p>
//           <p><strong>Notes:</strong> {response.notes}</p>
//         </div>
//       )}

//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//     </div>
//   );
// };

// export default Deposit;





























import React, { useState } from "react";
import axios from "axios";

const Deposit = () => {
  const [formData, setFormData] = useState({
    amount: "200000",
    bank: "BRI",
    owner_name: "JOHN",
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/deposit', {
        amount: formData.amount,
        bank: formData.bank,
        owner_name: formData.owner_name,
      });

      // Set response message from the API
      setResponseMessage(response.data);
    } catch (err) {
      console.error("Error during deposit:", err.message);
      setError("Failed to process deposit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deposit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold">Jumlah Deposit:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Bank:</label>
          <select
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Pilih Bank</option>
            <option value="BCA">BCA</option>
            <option value="Mandiri">Mandiri</option>
            <option value="BRI">BRI</option>
            <option value="BNI">BNI</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold">Nama Pemilik Rekening:</label>
          <input
            type="text"
            name="owner_name"
            value={formData.owner_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Deposit"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {responseMessage && (
        <div className="mt-4 p-4 bg-green-200 rounded-lg">
          <h2 className="text-xl font-bold">Response:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(responseMessage, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Deposit;
