import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdatePriceList from "./Pages/UpdatePriceList";
import UpdatePriceListLocal from "./Pages/UpdatePriceListLocal";
import PriceList from "./Pages/PriceList";
import PriceListLocal from "./Pages/PriceListLocal";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PriceList />} />
          <Route path="/local" element={<PriceListLocal />} />
          <Route path="/update" element={<UpdatePriceList />} />
          <Route path="/update-price-list-local" element={<UpdatePriceListLocal />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
