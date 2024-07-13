import express from "express";
import {
  getPosts,
  createPost,
  updateOldPost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
  getPostById,
} from "../controllers/postsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getPosts);
router.get('/:id', auth, getPostById);
router.post("/", auth, createPost);
router.patch("/:id", auth, updateOldPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post('/:id/comment', auth, addComment);
router.delete('/:postId/comment/:commentId', auth, deleteComment);

export default router;
