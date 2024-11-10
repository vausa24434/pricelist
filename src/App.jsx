import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdatePriceList from "./Pages/UpdatePriceList";
import UpdatePriceListLocal from "./Pages/UpdatePriceListLocal";
import Login from './Pages/Login';
import ProtectedRoute from './Pages/ProtectedRoute';
import { AuthProvider } from './Components/Auth/AuthProvider';
import { useState, useEffect } from 'react';
import SearchPage from './Pages/Search';
import SearchLocalPage from './Pages/SearchLocal';
import ProductPage from './Pages/Product';
import ProductLocalPage from './Pages/ProductLocal';
import HomePage from './Pages/HomePage';
import DepositPage from './Pages/Deposit';
<<<<<<< HEAD
import TransactionLocalPage from './Pages/TransactionLocal';
import TransactionPage from './Pages/Transaction';
=======
>>>>>>> 48e493e7b24637031b0d1a5d56c74cf72ac8795b

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
          <Route path="/" element={<SearchPage token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/searchlocal" element={<SearchLocalPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/local/:category/:brand/:type" element={<SearchLocalPage />} />
          <Route path="/updatelocal" element={<UpdatePriceListLocal />} /> 
          <Route path="/local" element={<SearchLocalPage />} />
          <Route path="/productlocal/:id" element={<ProductLocalPage />} />
          <Route path="/update" element={<ProtectedRoute><UpdatePriceList setToken={setToken} /></ProtectedRoute>} />
          <Route path="/deposit" element={<DepositPage />} />
<<<<<<< HEAD
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/transactionlocal" element={<TransactionLocalPage />} />
=======

>>>>>>> 48e493e7b24637031b0d1a5d56c74cf72ac8795b

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
