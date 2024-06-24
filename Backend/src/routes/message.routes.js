import { Router } from "express";
import { Inbox, mychat, send } from "../controller/message.controller.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/send").post(upload.none(), send);
router.route("/mychat/:ID1/:ID2").get(mychat);
router.route("/Inbox/:ID").get(Inbox);

export default router;
