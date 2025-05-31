import { Router } from "express";
import { createService, getServices } from "../controller/services.controller.js";

const router = Router();

router.get('/', getServices);
router.post('/', createService);

export default router;