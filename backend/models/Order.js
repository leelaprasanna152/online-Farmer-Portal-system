const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true }, 
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
    firm: { type: mongoose.Schema.Types.ObjectId, ref: 'Firm', required: true },
    products: [
      {
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
          quantity: { type: Number, required: true },
      }
  ],  
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);




