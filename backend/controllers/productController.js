const Product = require("../models/Product");
const multer = require("multer");
const Firm = require("../models/Firm");
const fs = require("fs");
const path = require("path");

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Destination folder where uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

// ✅ Add a new product
const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.filename : undefined; // Get uploaded image filename

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const product = new Product({
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            firm: firm._id
        });

        const savedProduct = await product.save();

        // Update firm's product list if it has a `products` field
        if (firm.products && Array.isArray(firm.products)) {
            firm.products.push(savedProduct._id);
            await firm.save();
        }

        res.status(201).json({ message: "Product added successfully", product: savedProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Get all products of a specific firm
const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const firmName = firm.firmName;
        const products = await Product.find({ firm: firmId });

        res.status(200).json({ firmName, products });
    } catch (error) {
        console.error("Error fetching firm's products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Delete a product by ID
const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" });
        }

        // Remove the product reference from the firm's product list
        await Firm.updateOne(
            { _id: deletedProduct.firm },
            { $pull: { products: deletedProduct._id } }
        );

        // Delete product image from storage if it exists
        if (deletedProduct.image) {
            const imagePath = path.join(__dirname, "..", "uploads", deletedProduct.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("firm", "firmName area"); // Fetch firm name
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    addProduct: [upload.single("image"), addProduct], // ✅ Middleware applied properly
    getProductByFirm,
    deleteProductById,
    getAllProducts
};