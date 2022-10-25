import express from "express";
import {
  getPost,
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/postsController.js";
import { protectAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", protectAuth, createPost);
router.patch("/:id", protectAuth, updatePost);
router.delete("/:id", protectAuth, deletePost);
router.patch("/:id/likePost", protectAuth, likePost);
router.post("/:id/commentPost", protectAuth, commentPost);

export default router;
