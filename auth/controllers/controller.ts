import { Request, Response } from "express";
import "express-session";
import AdminUser from "../models/AdminUser";
import { generateOTP, sendOTP } from "../services/otp";

declare module "express-session" {
  interface SessionData {
    adminLogin?: {
      user: AdminUser;
      otp: string;
    }
  }
}

export const sendLoginOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ success: false, message: "Username is required" });
      return;
    }

    const user = await AdminUser.findOne({ where: { username } });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    if (!user.contactNo) {
      res.status(400).json({ success: false, message: "Contact number not found" });
      return;
    }

    const otp = generateOTP();
    req.session.adminLogin = { user, otp };

    const otpSent = await sendOTP(user.contactNo, otp);
    if (!otpSent) {
      res.status(500).json({ success: false, message: "Failed to send OTP" });
      return;
    }

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyLoginOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { otp } = req.body;
    const { adminLogin } = req.session;

    if (!otp) {
      res.status(400).json({ success: false, message: "OTP is required" });
      return;
    }

    if (!adminLogin) {
      res.status(400).json({ success: false, message: "OTP was not sent" });
      return;
    }

    if (String(otp) !== adminLogin.otp) {
      res.status(400).json({ success: false, message: "Invalid OTP" });
      return;
    }
    const { username, id, privilege } = adminLogin.user;
    res.status(200).json({
      success: true, message: "Login successful", user: {
        username, id, privilege
      }
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
