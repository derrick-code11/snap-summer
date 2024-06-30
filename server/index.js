import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(cors());

// Parse application/json
app.use(express.json({ limit: "30mb", extended: true }));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const CONNECTION_URL =
  "";

const PORT = process.env.PORT || 5000;

app.use("/posts", postRoutes);

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));
