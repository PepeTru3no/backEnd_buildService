import { Router } from "express";
import { createService, getServices, getServiceById, addStars } from "../controller/services.controller.js";
import { addStratMiddleware, createServiceMiddleaware } from "../middleware/services.middleware.js";

const router = Router();

router.get('/', getServices);
router.post('/',createServiceMiddleaware, createService);
router.get('/:id', getServiceById);
router.put('/:id', addStratMiddleware, addStars);

export default router;