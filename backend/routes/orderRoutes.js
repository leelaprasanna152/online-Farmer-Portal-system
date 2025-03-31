const express = require('express');
const { getOrdersByBuyerAndFirm,getOrdersByFirm } = require('../controllers/orderController');
const router = express.Router();

const { createOrder } = require("../controllers/orderController");
router.post('/orders', createOrder);

router.get('/orders/:buyerId/:firmId', getOrdersByBuyerAndFirm);
router.get('/vendor-orders/:firmId', getOrdersByFirm);


module.exports = router;
