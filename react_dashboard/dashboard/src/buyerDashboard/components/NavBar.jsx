import React from "react";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <h1>Buyer Dashboard</h1>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/orders")}>My Orders</button>
    </nav>
  );
};

export default NavBar;