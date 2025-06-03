import { Router } from "express";
import { createSavedService, getSavedService } from "../controller/saved_service.controller.js";

const router = Router();

router.get('/:id', getSavedService);
router.post('/', createSavedService);

export default router;