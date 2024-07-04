import express from "express";
import {
  getPosts,
  createPost,
  updateOldPost,
  deletePost,
  likePost
} from "../controllers/postsController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updateOldPost);
router.delete("/:id", deletePost)
router.patch('/:id/likePost', likePost);

export default router;
