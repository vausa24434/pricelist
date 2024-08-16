import React, { useState } from 'react';
import axios from 'axios';

const Deposit = () => {
  const [amount, setAmount] = useState('200000');
  const [bank, setBank] = useState('BRI');
  const [ownerName, setOwnerName] = useState('DANU TRIANGGORO');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Detail yang Anda berikan
  const apiUrl = import.meta.env.VITE_API_URL_D;
  const username = import.meta.env.VITE_USERNAME;
  const sign = import.meta.env.VITE_SIGN_D;

  const handleDeposit = async () => {
    const data = {
      username: username,
      amount: parseInt(amount, 10),
      bank: bank,
      owner_name: ownerName,
      sign: sign,
    };

    try {
      const result = await axios.post(`${apiUrl}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResponse(result.data.data);
      setError(null);
    } catch (err) {
      console.error('Error making deposit:', err);
      setError(err.response ? err.response.data.message : err.message);
      setResponse(null);
    }
  };

  return (
    <div>
      <h1>Deposit</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Bank:
          <select value={bank} onChange={(e) => setBank(e.target.value)} required>
            <option value="">Select Bank</option>
            <option value="BCA">BCA</option>
            <option value="MANDIRI">MANDIRI</option>
            <option value="BRI">BRI</option>
            <option value="BNI">BNI</option>
          </select>
        </label>
        <br />
        <label>
          Owner Name:
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="button" onClick={handleDeposit}>Make Deposit</button>
      </form>

      {response && (
        <div>
          <h2>Deposit Successful</h2>
          <p><strong>Response Code:</strong> {response.rc}</p>
          <p><strong>Amount:</strong> {response.amount}</p>
          <p><strong>Notes:</strong> {response.notes}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Deposit;