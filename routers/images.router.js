import { Router } from "express";
import { createImage, getImages } from "../controller/images.controller.js";

const router = Router();

router.get('/:id', getImages);
router.post('/', createImage);

export default router;