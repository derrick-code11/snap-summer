import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js"

const app = express();

// Parse application/json
app.use(express.json({ limit: "30mb", extended: true }));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://demoemail1428:Kwabena03@black001.ngmuy86.mongodb.net/?retryWrites=true&w=majority&appName=Black001";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));

app.use('/posts', postRoutes)

