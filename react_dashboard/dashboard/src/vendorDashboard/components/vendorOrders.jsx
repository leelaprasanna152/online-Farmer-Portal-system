import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../data/apiPath';
import "../../buyerDashboard/components/Orders.css";

const VendorOrders = () => {
    const [orders, setOrders] = useState([]);
    const firmId = localStorage.getItem("firmId"); // Get vendor's firm ID

    useEffect(() => {
        if (!firmId) {
            console.error("Firm ID missing");
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/vendor-orders/${firmId}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching vendor orders:", error);
            }
        };

        fetchOrders();
    }, [firmId]);

    
    return (
        <div className="orders-container">
            <h2 className="orders-title">Your Orders</h2>
            {orders.length === 0 ? (
                <p className="no-orders">No orders available</p>
            ) : (
                orders.map(order => (
                    <div key={order._id} className="order-box">
                        <h3 className="order-id">Order ID: {order._id}</h3>
                        <p><strong>Buyer:</strong> {order.buyer.username}</p>
                        <p className="order-total"><strong>Total:</strong> ₹{order.totalAmount}</p>
                        <p className="order-date"><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                        <ul className="order-items">
                            {order.products.map((item, index) => (
                                <li key={index} className="order-item product-box">
                                    <span className="product-name">{item.product.productName}</span>
                                    <span className="product-price">₹{item.product.price}</span>
                                    <span className="product-quantity">x {item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
    
};

export default VendorOrders;
