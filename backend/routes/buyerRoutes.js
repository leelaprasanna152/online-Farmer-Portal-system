const express = require('express');
const { registerBuyer, loginBuyer, getBuyerById,placeOrder,getFarmerOrders } = require('../controllers/buyerController');


const router = express.Router();

router.post('/register', registerBuyer);
router.post('/login', loginBuyer);
router.get('/single-buyer/:buyerId', getBuyerById); // ✅ Added route for fetching buyer details

module.exports = router;

