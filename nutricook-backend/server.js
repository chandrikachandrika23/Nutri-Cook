import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/foodsRoutes.js";
import preferenceRoutes from "./routes/preferencesRoutes.js";
import recipeRoutes from "./routes/recipesRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // allow frontend
app.use(express.json());

// Routes
app.use("/api/foods", foodRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected:", process.env.DB_NAME))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
