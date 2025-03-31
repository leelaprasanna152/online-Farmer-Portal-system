
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/Welcome";
import AllProducts from "../components/AllProducts";
import VendorOrders from "../components/vendorOrders"; // ✅ Updated Import
import "./LandingPage.css"; // ✅ Import styles

import io  from "socket.io-client";
import { API_URL } from "../data/apiPath";
import axios from "axios";
const socket = io("http://localhost:4000");

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);
  
  const [vendorId, setVendorId] = useState(null);
  // ✅ Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [buyerUsername, setBuyerUsername] = useState("");
  const [buyerId, setBuyerId] = useState(null);
  

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    const storedVendorId = localStorage.getItem("vendorId");

    if (loginToken) {
      setShowLogOut(true);
      setShowWelcome(true);
    }

    if (storedVendorId) {
      setVendorId(storedVendorId);
    }
  }, []);

  useEffect(() => {
    try {
      const firmName = localStorage.getItem("firmName");
      const firmId = localStorage.getItem("firmId");
      if (firmName || firmId) {
        setShowFirmTitle(false);
        setShowWelcome(true);
      }
    } catch (error) {
      console.error("Error retrieving firm data:", error);
    }
  }, []);

  

  useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        return () => socket.off("receiveMessage");
    }, []);
  

  const logOutHandler = () => {
    confirm("Are you sure to logout?");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    localStorage.removeItem("vendorId");
    setShowLogOut(false);
    setShowFirmTitle(true);
    setShowWelcome(false);
  };



  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowOrders(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowOrders(false);
  };

  const showFirmHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(true);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowOrders(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const showProductHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(true);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowOrders(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const showWelcomeHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  };

  const showAllProductsHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);
      setShowOrders(false);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  const showOrdersHandler = () => {
    if (showLogOut) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowOrders(true);
    } else {
      alert("Please login");
      setShowLogin(true);
    }
  };

  // ✅ Chat functions
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const fetchBuyerId = async () => {
    try {
        if (!buyerUsername.trim()) {
            console.error("Invalid buyer username:", buyerUsername);
            return;
        }
        
        console.log("Fetching buyer ID for username:", buyerUsername);
        const response = await axios.get(`http://localhost:4000/messages/buyer/${encodeURIComponent(buyerUsername)}`);
        
        console.log("Response Data:", response.data);
        setBuyerId(response.data.buyerId);
    } catch (error) {
        console.error("Error fetching buyer ID:", error.response?.data || error.message);
    }
};


const sendMessage = () => {
  if (message.trim()) {
      const newMessage = { 
          receiverId: buyerId, 
          senderId: vendorId, // Ensure senderId is included
          senderType: "vendor",
          message 
      };
      socket.emit("sendMessage", newMessage);
      setMessage(""); // Clear input field after sending
  }
};

  return (
    <>
      <section className="landingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          logOutHandler={logOutHandler}
        />
        <div className="collectionSection">
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showOrdersHandler={showOrdersHandler}
            showFirmTitle={showFirmTitle}
          />

          {showFirm && showLogOut && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogOut && <AllProducts />}
          {showOrders && showLogOut && vendorId && <VendorOrders vendorId={vendorId} />}
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
        </div>
      </section>

      {/* ✅ Chat Icon */}
      <button className="chat-icon" onClick={toggleChat}>💬</button>

      {/* ✅ Chat Window */}
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Chat with Buyer</h3>
            <button onClick={toggleChat}>✖</button>
          </div>
          
          <div className="chat-input">
          {/* <input type="text" placeholder="Enter Buyer Username" value={buyerUsername} onChange={(e) => setBuyerUsername(e.target.value)} />
          <button onClick={fetchBuyerId}>Find Buyer</button> */}
          
          <input type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />
          
          <button onClick={sendMessage} >Send</button>

          </div>
          <div className="chat-messages">
              {messages.map((msg, index) => (
                  <p key={index}><strong>{msg.senderType}:</strong> {msg.message}</p>
              ))}
          </div>
          
        </div>
      )}
   </>
  );
};

export default LandingPage;
