const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const Buyer = require('../models/Buyer');

// Fetch vendor ID based on username
router.get("/vendor/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const vendor = await Vendor.findOne({ username: new RegExp(`^${username}$`, "i") });
        if (!vendor) return res.status(404).json({ message: "Vendor not found" });
        res.json({ vendorId: vendor._id });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});




// Fetch buyer ID based on username
router.get('/buyer/:username', async (req, res) => {
    try {
        const buyer = await Buyer.findOne({ username: new RegExp(`^${req.params.username}$`, "i") });
        if (!buyer) return res.status(404).json({ error: 'Buyer not found' });
        res.json({ buyerId: buyer._id });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;