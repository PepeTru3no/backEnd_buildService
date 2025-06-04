import { Router } from "express";
import { createImage, getImages } from "../controller/images.controller.js";
import { createImageMiddleware } from "../middleware/images.middleware.js";
import multer from "multer";

const router = Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage })

router.get('/:id', getImages);
router.post('/:id', upload.array('file', 50), createImage);

export default router;