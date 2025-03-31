import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Major from "./vendorDashboard/pages/Major";
import LandingPage from "./vendorDashboard/pages/LandingPage";
import Landing from "./buyerDashboard/components/Landing/Landing";
import Login from "./buyerDashboard/components/forms/Login";  // ✅ Fixed import
import Register from "./buyerDashboard/components/forms/Register";  // ✅ Fixed import
import Shop from "./buyerDashboard/components/Shop";
import Cart from "./buyerDashboard/components/Cart";
import Order from "./buyerDashboard/components/Orders";
import VendorOrders from "./vendorDashboard/components/vendorOrders";
import NotFound from "./vendorDashboard/components/NotFound";

import "./App.css";

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Major />} /> {/* Default page */}
        <Route path="/landing" element={<LandingPage />} /> {/* Farmer Landing Page */}
        <Route path="/Buyerlanding" element={<Landing />} /> {/* Buyer Landing Page */}
        <Route path="/login" element={<Login />} /> {/* ✅ Fixed Capitalization */}
        <Route path="/register" element={<Register />} /> {/* ✅ Fixed Capitalization */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/vendor-orders" element={<VendorOrders />} /> {/* ✅ Vendor Orders */}
        <Route path="*" element={<NotFound />} /> {/* 404 Not Found */}
      </Routes>
    
      
  );
};

export default App;
