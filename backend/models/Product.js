const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number, // ✅ Changed from String to Number
        required: true
    },
    category: {
        type: String, // ✅ Changed from array to single string
        enum: ["vegetables", "fruits"]
    },
    image: {
        type: String // Stores the image filename (not actual image data)
    },
    bestSeller: {
        type: Boolean,
        default: false // Default value set to false
    },
    description: {
        type: String
    },
    firm: {
        type: mongoose.Schema.Types.ObjectId, // ✅ Changed from array to single reference
        ref: "Firm",
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;