import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UpdatePriceList from "./Pages/UpdatePriceList";
import UpdatePriceListLocal from "./Pages/UpdatePriceListLocal";
import Login from './Pages/Login';
import ProtectedRoute from './Pages/ProtectedRoute';
import { AuthProvider } from './Components/Auth/AuthProvider';
import { useState, useEffect } from 'react';
import Pencarian from './Pages/Search';
import SearchLocalPage from './Pages/SearchLocal';
import ProductPage from './Pages/Product';

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
          <Route path="/" element={<Pencarian token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/search" element={<Pencarian />} />
          <Route path="/searchlocal" element={<SearchLocalPage />} />
          <Route path="/update-price-list-local" element={<UpdatePriceListLocal />} /> 
          <Route path="/local" element={<SearchLocalPage />} />
          <Route path="/update" element={<ProtectedRoute><UpdatePriceList setToken={setToken} /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
