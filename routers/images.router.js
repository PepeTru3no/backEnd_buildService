import { Router } from "express";
import { createImage, getImages, createImageUser} from "../controller/images.controller.js";
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
router.post('/user/:id', upload.single('file'), createImageUser);
router.post('/:id', upload.array('file', 50), createImage);

export default router;
