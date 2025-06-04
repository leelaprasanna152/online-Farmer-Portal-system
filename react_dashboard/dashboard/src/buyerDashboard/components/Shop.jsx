
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { API_URL } from "../data/apiPath";
import CartSidebar from "../components/CartSidebar";
import io  from "socket.io-client";
import axios from "axios";
const socket = io("https://online-farmer-portal-system-2.onrender.com");

import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("");

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [vendorUsername, setVendorUsername] = useState("");
  const [vendorId, setVendorId] = useState(null);
  

  const buyerId = localStorage.getItem("buyerId");
  const firmId = localStorage.getItem("firmId");

  const navigate = useNavigate();
  const loginToken = localStorage.getItem("loginToken");

  useEffect(() => {
          socket.on("receiveMessage", (newMessage) => {
              setMessages((prevMessages) => [...prevMessages, newMessage]);
          });
          return () => socket.off("receiveMessage");
      }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/product/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (!loginToken) {
      alert("Please login to add products to the cart.");
      return;
    }

    const existingItem = cart.find((item) => item._id === product._id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
  };

  const handleCartOpen = () => {
    if (!loginToken) {
      alert("Please login to view your cart.");
      return;
    }
    setIsCartOpen(true);
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    alert("Logged out successfully!");
    navigate("/Buyerlanding");
  };

  const handleDashboardRedirect = () => {
    navigate("/buyer-dashboard-stats");
  };

  const handleOrdersRedirect = () => {
    navigate("/orders");
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const fetchVendorId = async () => {
    try {
        if (!vendorUsername.trim()) {
            console.error("Invalid vendor username:", vendorUsername);
            return;
        }
        const response = await axios.get(`${API_URL}/messages/vendor/${encodeURIComponent(vendorUsername)}`);
        setVendorId(response.data.vendorId);
    } catch (error) {
        console.error("Error fetching vendor ID:", error.response?.data || error.message);
    }
};

const sendMessage = () => {
  if (message.trim() && vendorId) {
      const newMessage = { 
          receiverId: vendorId, 
          senderId: buyerId, // Include senderId
          senderType: "buyer", 
          message 
      };
      socket.emit("sendMessage", newMessage);
      setMessage(""); // Clear input field
  }
};


  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())&&
  (areaFilter === "" || (product.firm?.area && product.firm.area.toLowerCase().includes(areaFilter.toLowerCase())))

  );

  return (
    <div>
      <header className="shop-header">
        <h2>Shop</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="area-filter" value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)}>
          <option value="">All Areas</option>
          <option value="Srikakulam">Srikakulam</option>
          <option value="Vizag">Vizag</option>
          <option value="Narasapur">Narasapur</option>
          <option value="Hyd">Hyderabad</option>
        </select>
        <div className="nav-right">
          <button className="cart-button" onClick={handleCartOpen}>
            🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>

          <div className="profile-container" onClick={handleProfileClick}>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
              alt="Profile"
              className="profile-pic"
            />
            <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              <p onClick={handleOrdersRedirect}>My Orders</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          </div>
        </div>
      </header>

      {error && <p className="error-message">{error}</p>}

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`${API_URL}/uploads/${product.image}`}
                alt={product.productName}
                className="product-image"
              />
              <h3>{product.productName}</h3>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Area:</strong> {product.firm?.area || "Unknown Area"}</p>
              <p><strong>Firm:</strong> {product.firm?.firmName || "Unknown Firm"}</p>
              <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <CartSidebar
        isCartOpen={isCartOpen}
        toggleCart={() => setIsCartOpen(false)}
        cartItems={cart}
        clearCart={() => setCart([])}
      />

      {/* Chat Icon */}
      <button className="chat-icon" onClick={toggleChat}>💬</button>

      {/* Chat Window */}
      {isChatOpen && (
        
        <div className="chat-window">
  <div className="chat-header">
    <h3>Chat with Vendor</h3>
    <button onClick={toggleChat}>✖</button>
  </div>

  {/* Input Section */}
  <div className="chat-input">
    <input 
      type="text" 
      placeholder="Enter Vendor Username" 
      value={vendorUsername} 
      onChange={(e) => setVendorUsername(e.target.value)} 
    />
    <button onClick={fetchVendorId}>Find Vendor</button>
    
    <input 
      type="text" 
      placeholder="Type a message" 
      value={message} 
      onChange={(e) => setMessage(e.target.value)} 
    />
    <button onClick={sendMessage} disabled={!vendorId}>Send</button>
  </div>

  {/* Messages should be BELOW input fields */}
  <div className="chat-messages">
    {messages.map((msg, index) => (
      <p key={index}><strong>{msg.senderType}:</strong> {msg.message}</p>
    ))}
  </div>
</div>

      )}
    </div>
  );
};

export default Shop;



