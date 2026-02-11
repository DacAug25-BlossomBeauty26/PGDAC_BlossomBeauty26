import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";

import Home from "./components/Home";
import CartPage from "./components/CartPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import InvoicePage from "./components/InvoicePage";
import MyOrders from "./components/MyOrders";
import Wishlist from "./components/Wishlist";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/invoice" element={<InvoicePage /> }/>
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<Wishlist />} />
            
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
