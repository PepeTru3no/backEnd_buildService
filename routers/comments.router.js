// routers/comments.router.js
import { Router } from "express";
import {
  createComment,
  getComments,
  getCommentsByService,
} from "../controller/comments.controller.js";
import { createCommentMiddleware } from "../middleware/comments.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getComments);
router.post("/", authMiddleware, createCommentMiddleware, createComment); // Protegida
router.get("/:id", getCommentsByService);

export default router;
