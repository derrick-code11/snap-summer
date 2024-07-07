import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors());

// Parse application/json
app.use(express.json({ limit: "30mb", extended: true }));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/api/v1", (req, res) => {
  res.send("Welcome to SnapSummer API");
});

app.use("/api/v1/posts", postRoutes);
app.use('/api/v1/auth', authRoutes);

// Catch-all route for undefined routes
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));
