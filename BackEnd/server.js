import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

// Configure dotenv
dotenv.config();

const app = express();

// Middleware of Cors to allows the restrict Acess like API
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Parse Incoming JSON fot POst, GET, PUT, DELETE Requests
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api", authRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
