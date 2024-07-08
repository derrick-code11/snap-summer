import express from "express";
import {
  getPosts,
  createPost,
  updateOldPost,
  deletePost,
  likePost,
} from "../controllers/postsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updateOldPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
