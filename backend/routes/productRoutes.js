const express = require("express");
const path = require("path");
const productController = require("../controllers/productController");

const router = express.Router();

// ✅ Add a product under a specific firm
router.post("/add-product/:firmId", productController.addProduct);

// ✅ Fetch all products of a specific firm
router.get("/:firmId/products", productController.getProductByFirm);

// ✅ Fetch all products for the Buyer Dashboard (Ensure this function exists in productController)
if (productController.getAllProducts) {
    router.get("/all", productController.getAllProducts);
} else {
    console.warn("⚠️ Warning: getAllProducts is not defined in productController.");
}

// ✅ Delete a product by ID
router.delete("/:productId", productController.deleteProductById);

module.exports = router;