import { Router } from "express";
import { createComment, getComments, getCommentsByService } from "../controller/comments.controller.js";
import { createCommentMiddleware } from "../middleware/comments.middleware.js";

const router = Router();

router.get('/', getComments);
router.post('/', createCommentMiddleware, createComment);
router.get('/:id', getCommentsByService);
export default router;