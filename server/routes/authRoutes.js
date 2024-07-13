import express from "express";
import {
  register,
  login,
  resetPassword,
  requestPasswordReset,
  googleSignIn,
} from "../controllers/authController.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

// Google Sign-In
router.post("/google", googleSignIn);

// Request password reset link
router.post("/request-reset", requestPasswordReset);

// Reset password
router.post("/reset-password/:token", resetPassword);

export default router;
