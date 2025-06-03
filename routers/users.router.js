import { Router } from "express";
import { addStars, createUser, getUsers, login } from "../controller/users.controller.js";
import { addStratMiddleware, loginMiddleware, registerMiddleware } from "../middleware/users.middleware.js";

const router = Router();

router.get('/', getUsers);
router.post('/',registerMiddleware, createUser);
router.put('/:id', addStratMiddleware, addStars);
router.post('/login', loginMiddleware, login);

export default router;