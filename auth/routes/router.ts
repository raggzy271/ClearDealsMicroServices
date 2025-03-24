import express from "express";
import { sendLoginOtp, verifyLoginOtp } from "../controllers/controller";

const router = express.Router();

router.post("/send-otp", sendLoginOtp);
router.post("/verify-otp", verifyLoginOtp);

export default router;
