import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../controller/user.controller.js";
import { isVerify } from "../middleware/verifyToken.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/me").get(isVerify, getCurrentUser);
router.route("/logout").get(isVerify, logoutUser);

export default router;
