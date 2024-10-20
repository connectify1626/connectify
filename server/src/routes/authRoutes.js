import { signup, login, handleLogout } from "../controllers/authController.js";
import express from "express";
import { HandleAsyncError } from "../middleware/catchError.js";
import { loginValidations, registerValidations } from "../middleware/validator.js";
import { verifyToken } from "../middleware/authorise.js";

/* Routes */
const router = express.Router();

router.post("/signup", registerValidations, HandleAsyncError(signup));
router.post("/login", loginValidations, HandleAsyncError(login));
router.get("/logout", verifyToken, HandleAsyncError(handleLogout));

export default router;