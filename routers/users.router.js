import { Router } from "express";
import { addStars, createUser, deleteUser, getUsers, login, updateUser, verify } from "../controller/users.controller.js";
import { addStratMiddleware, loginMiddleware, registerMiddleware, updateMiddleware } from "../middleware/users.middleware.js";

const router = Router();

router.get('/', getUsers);
router.post('/',registerMiddleware, createUser);
router.put('/up/:id',updateMiddleware, updateUser)
router.get('/verify/:token',verify)
router.put('/:id', addStratMiddleware, addStars);
router.post('/login', loginMiddleware, login);
router.delete('/:id',deleteUser);

export default router;