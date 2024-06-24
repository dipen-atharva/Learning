import { Router } from "express";
import {
  login,
  register,
  getuser,
  birthday,
} from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(upload.none(), register);
router.route("/login").post(upload.none(), login);

// secure routes

router.route("/getuser").get(verifyJWT, getuser);
router.route("/birthday").get(verifyJWT, birthday);
// router.route("/getuser").get(verifyJWT, getuser);

export default router;
