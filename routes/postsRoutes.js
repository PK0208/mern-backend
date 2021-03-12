import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postsController.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/posts", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likepost", likePost);

export default router;
