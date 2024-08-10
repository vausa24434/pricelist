













import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UpdatePriceList from "./Pages/UpdatePriceList";
import UpdatePriceListLocal from "./Pages/UpdatePriceListLocal";
import PriceList from "./Pages/PriceList";
import PriceListLocal from "./Pages/PriceListLocal";
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoute from './Pages/ProtectedRoute';
import { AuthProvider } from './Components/AuthProvider';
import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState(false)
  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PriceList token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/local" element={<PriceListLocal />} />
          <Route path="/update-price-list-local" element={<UpdatePriceListLocal />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<ProtectedRoute><UpdatePriceList /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
