import { Router } from "express";
import { getUsers } from "../controller/users.controller.js";

const router = Router();

router.get('/', getUsers);
//router.post('/', createService);

export default router;