// import React, { useState } from "react";
// import axios from "axios";

// const Deposit = () => {
//   const [amount, setAmount] = useState("200000");
//   const [bank, setBank] = useState("BRI");
//   const [ownerName, setOwnerName] = useState("JOHN");
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleDeposit = async () => {
//     try {
//       const response = await axios.post('http://localhost:3002/deposit', {
//         username: 'yitaxig4J76D',
//         sign: 'bf23cc47ac5a56031fc05c7057b535e6',
//         amount: 200000,
//         bank_code: 'BCA',
//         owner_name: 'JOHN',
//       });
//       console.log('Deposit response:', response.data);
//     } catch (error) {
//       console.error('Error handling deposit:', error);
//     }
//   };
  

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Deposit</h1>
//       {successMessage && <p className="text-green-500">{successMessage}</p>}
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <form onSubmit={handleDeposit} className="bg-white shadow-md rounded-lg p-4 border">
//         <div className="mb-4">
//           <label className="block text-gray-700">Jumlah Deposit (Rp):</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Bank:</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={bank}
//             onChange={(e) => setBank(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Nama Pemilik Rekening:</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={ownerName}
//             onChange={(e) => setOwnerName(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? "Memproses..." : "Submit Deposit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Deposit;














import React from 'react';

const ExternalPage = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://kerandoman.infinityfreeapp.com/"
        title="External Page"
        className="w-full h-full border-0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ExternalPage;
