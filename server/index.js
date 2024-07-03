import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(cors());
dotenv.config();

// Parse application/json
app.use(express.json({ limit: "30mb", extended: true }));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to SnapSummer API");
});

app.use("/posts", postRoutes);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));
