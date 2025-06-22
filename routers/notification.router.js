// routers/notification.router.js
import express from "express";
import {
  getNotificationsByUser,
  markAsRead,
} from "../controller/notification.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getNotificationsByUser);
router.put("/read", authMiddleware, markAsRead);

export default router;
