const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.WhatIsYourName;
if (!secretKey) {
    console.error("❌ Missing JWT secret key in .env file!");
}

// ✅ Register Vendor
const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const vendorEmail = await Vendor.findOne({ email });

        if (vendorEmail) {
            return res.status(400).json({ error: "Email already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword,
        });

        await newVendor.save();
        console.log("✅ Vendor registered:", newVendor._id);

        res.status(201).json({ message: "Vendor registered successfully" });
    } catch (error) {
        console.error("🚨 Error during vendor registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Login Vendor
const vendorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const vendor = await Vendor.findOne({ email });

        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });

        console.log(`✅ Login successful: ${email}, Token generated: ${token}`);

        res.status(200).json({
            success: "Login successful",
            token,
            vendorId: vendor._id,
        });
    } catch (error) {
        console.error("🚨 Login Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Get All Vendors
const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate("firm");

        console.log("✅ Retrieved all vendors:", vendors.length);
        res.json({ vendors });
    } catch (error) {
        console.error("🚨 Error fetching vendors:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Get Vendor By ID (Fixed)
const getVendorById = async (req, res) => {
    const vendorId = req.params.apple; // ✅ Fixed to match correct param key

    try {
        if (!vendorId || vendorId.length !== 24) {
            return res.status(400).json({ error: "Invalid or missing vendor ID." });
        }

        console.log("🔍 Fetching vendor with ID:", vendorId);

        const vendor = await Vendor.findById(vendorId).populate("firm");

        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        if (!vendor.firm || vendor.firm.length === 0) {
            return res.status(404).json({ error: "Vendor firm not found" });
        }

        const vendorFirmId = Array.isArray(vendor.firm) ? vendor.firm[0]._id : vendor.firm._id;

        console.log(`✅ Vendor Firm ID: ${vendorFirmId}`);
        res.status(200).json({ vendorId, vendorFirmId, vendor });

    } catch (error) {
        console.error("🚨 Error fetching vendor:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById };
