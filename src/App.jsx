import React from "react";
import PriceList from "./Pages/PriceList";
import PriceListLocal from "./Pages/PriceListLocal";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PriceList />} />
          <Route path="/price-list-local" element={<PriceListLocal />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
