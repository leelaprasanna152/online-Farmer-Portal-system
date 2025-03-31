const Order = require('../models/Order');

const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
    try {
        const { buyer, firm, products, totalAmount } = req.body;

        // Ensure orderNumber is generated before saving
        const orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const newOrder = new Order({
            orderNumber, // Assign generated order number
            buyer,
            firm,
            products,
            totalAmount,
            //status: "Pending"
        });

        await newOrder.save();

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ error: "Failed to place order", details: error.message });
    }
};

exports.getOrdersByBuyerAndFirm = async (req, res) => {
    try {
        const { buyerId, firmId } = req.params;
        console.log("Received BuyerID:", buyerId);
        console.log("Received FirmID:", firmId);

        const orders = await Order.find({ buyer: buyerId, firm: firmId }).populate('products.product');
        console.log("Found Orders:", orders);

        if (!orders.length) {
            return res.status(404).json({ error: "No orders found for this buyer and firm" });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getOrdersByFirm = async (req, res) => {
    try {
        const { firmId } = req.params;
        console.log("Received FirmID:", firmId);

        // Fetch only orders where firm matches the firmId provided in the request
        const orders = await Order.find({ firm: firmId })
            .populate('buyer', 'username')  // Get buyer name
            .populate('products.product');  // Get product details

        console.log("Filtered Orders for Firm:", firmId, orders);

        if (!orders.length) {
            return res.status(404).json({ error: "No orders found for this firm" });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching vendor orders:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
