const Buyer = require('../models/Buyer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerBuyer = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) return res.status(400).json({ error: "Buyer already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newBuyer = new Buyer({ username, email, password: hashedPassword });

    await newBuyer.save();
    res.status(201).json({ message: "Buyer registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginBuyer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyer = await Buyer.findOne({ email });

    if (!buyer) return res.status(404).json({ error: "Buyer not found" });

    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: buyer._id }, "yourSecretKey", { expiresIn: "1h" });
    res.json({ message: "Login successful", token, buyerId: buyer._id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBuyerById = async (req, res) => {
  try {
    const buyerId = req.params.buyerId; 
    const buyer = await Buyer.findById(buyerId); 

    if (!buyer) return res.status(404).json({ error: "Buyer not found" });

    res.json(buyer); // ✅ Return buyer details
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = { registerBuyer, loginBuyer, getBuyerById};
