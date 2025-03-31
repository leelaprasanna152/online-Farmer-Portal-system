import React from "react";
import { useNavigate } from "react-router-dom";
import "./Major.css"; // Import CSS file

const Major = () => {
  const navigate = useNavigate();

  return (
    <div className="major-container">
      {/* Top section with heading */}
      <div className="header">
        <h1 className="site-title">Farmer Portal</h1>
        
      </div>

      {/* Main content with login cards */}
      <div className="login-section">
      <div className="login-card buyer" onClick={() => navigate("/Buyerlanding")}>
          <div className="card-top buyer-top"></div>
          <img src="Farmer Images/buyer.png" alt="Buyer" className="user-icon" />
          <h3>Buyer</h3>
          <button className="login-button">BUYER ROLE</button>
        </div>
        
        <div className="login-card farmer" onClick={() => navigate("/landing")}>
          <div className="card-top farmer-top"></div>
          <img src="Farmer Images/farmer.jpeg" alt="Farmer" className="user-icon" />
          <h3>Farmer</h3>
          <button className="login-button">FARMER ROLE</button>
        </div>

        
      </div>
    </div>
  );
};

export default Major;
