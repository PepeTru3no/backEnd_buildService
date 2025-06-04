import { Router } from "express";
import { createService, getServices } from "../controller/services.controller.js";
import { createServiceMiddleaware } from "../middleware/services.middleware.js";

const router = Router();

router.get('/', getServices);
router.post('/',createServiceMiddleaware, createService);

export default router;