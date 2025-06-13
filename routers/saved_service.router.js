import { Router } from "express";
import { createSavedService, deleteSavedService, getSavedService } from "../controller/saved_service.controller.js";

const router = Router();

router.get('/', getSavedService);
router.post('/', createSavedService);
router.delete('/', deleteSavedService);

export default router;