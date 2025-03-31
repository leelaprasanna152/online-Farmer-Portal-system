const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalOrders: { type: Number, default: 0 },
  totalPayments: { type: Number, default: 0 },
  totalProducts: { type: Number, default: 0 },
});

module.exports = mongoose.model('Buyer', BuyerSchema);