import { Router } from "express";
import { createService, getServices, getServiceById, addStars, getFavServById, getServiceByUserId, deleteService, updateService } from "../controller/services.controller.js";
import { addStratMiddleware, createServiceMiddleaware, updateServiceMiddleware } from "../middleware/services.middleware.js";

const router = Router();

router.get('/', getServices);
router.post('/',createServiceMiddleaware, createService);
router.get('/favorite', getFavServById);
router.get('/byUser', getServiceByUserId);
router.put('/service/:id', updateServiceMiddleware, updateService);
router.get('/:id', getServiceById);
router.put('/:id', addStratMiddleware, addStars);
router.delete('/', deleteService);


export default router;