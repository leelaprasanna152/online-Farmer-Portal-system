import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Orders.css"; 
import { API_URL } from '../data/apiPath';

const Orders = ({ buyerId: propBuyerId, firmId: propFirmId }) => {
    const [orders, setOrders] = useState([]);

    // Get values from props or localStorage
    const buyerId = localStorage.getItem("buyerId");
    const firmId = localStorage.getItem("firmId");

    console.log("LocalStorage BuyerID:", buyerId);
    console.log("LocalStorage FirmID:", firmId);

    useEffect(() => {
        console.log("Fetching orders for:", buyerId, firmId);

        if (!buyerId || !firmId) {
            console.error("Missing buyerId or firmId, API call skipped.");
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/orders/${buyerId}/${firmId}`);

                console.log("API Response:", response.data);

                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    setOrders([]);
                    console.error("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setOrders([]);
            }
        };

        fetchOrders();
    }, [buyerId, firmId]);

    return (
        <div className="orders-container">
            <h2 className="orders-title">Your Orders</h2>
            {orders.length === 0 ? (
                <p className="no-orders">No orders placed yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="order-box">
                        <h3 className="order-id">Order ID: {order._id}</h3>
                        <p className="order-date"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="order-total"><strong>Total:</strong> ₹{order.totalAmount}</p>
                        <ul className="order-items">
                            {order.products.map((item, index) => (
                                <li key={index} className="order-item">
                                    <div className="product-box">
                                        <span className="product-name">{item.product?.productName || "Unknown Product"}</span> - 
                                        <span className="product-price"> ₹{item.product?.price || 0}</span> x 
                                        <span className="product-quantity"> {item.quantity}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;
