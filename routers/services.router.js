import { Router } from "express";
import { createService, getServices, getServiceById } from "../controller/services.controller.js";
import { createServiceMiddleaware } from "../middleware/services.middleware.js";

const router = Router();

router.get('/', getServices);
router.post('/',createServiceMiddleaware, createService);
router.get('/:id', getServiceById);

export default router;