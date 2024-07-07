import express from "express";
import {
  register,
  login,
  resetPassword,
  googleSignIn
} from "../controllers/authController.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

// Google Sign-In
router.post('/google', googleSignIn);

// Reset password
router.post("/reset-password", resetPassword);

export default router;
