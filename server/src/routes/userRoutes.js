import express from "express";
import { HandleAsyncError } from "../middleware/catchError.js";
import { verifyToken } from "../middleware/authorise.js";
import { handleProfile } from "../controllers/userController.js";
import multer from "multer";
/* Routes */
const router = express.Router();

router.use(verifyToken);

//Code for saving profile image to disk.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '_' + file.originalname);
    }
});
const upload = multer({ storage });

router.post("/createProfile", upload.single('file'), verifyToken, HandleAsyncError(handleProfile));
router.post("/updateProfile", upload.single('file'), verifyToken, HandleAsyncError(handleProfile));

export default router;