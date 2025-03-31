const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

dotEnv.config();
app.use(cors());
app.use(bodyParser.json());

// Attach WebSocket to `req.io` for real-time messaging
app.use((req, res, next) => {
  req.io = io;
  next();
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log(error));

// API Routes
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/buyer", buyerRoutes);
app.use("/api", orderRoutes);
app.use("/messages", messageRoutes);

// WebSocket Implementation
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at port ${process.env.PORT || 4000}`);
});
