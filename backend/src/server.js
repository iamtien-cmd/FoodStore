require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const returnRequestRoutes = require("./routes/returnRequestRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS: cho phép frontend Vite truy cập backend
const allowedOrigins = [
  "http://localhost:5173",
  "https://foodstore-kjjql307g-iamtien-cmds-projects.vercel.app",
  // Thêm domain Vercel production chính thức của bạn nếu khác
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/test", testRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/returns", returnRequestRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Halal Food API is running!",
  });
});

// Database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
