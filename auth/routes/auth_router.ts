import express from "express";
import { loginStep1 } from "../controllers/auth_controller";

const router = express.Router();

router.post("/login_step1", loginStep1);

export default router;
