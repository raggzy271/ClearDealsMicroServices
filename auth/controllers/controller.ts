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

export const sendLoginOtp = async (req: Request, res: Response, next: any): Promise<void> => {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ success: false, message: "Username is required" });
      return next();
    }

    const user = await AdminUser.findOne({ where: { username } });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return next();
    }

    if (!user.contactNo) {
      res.status(400).json({ success: false, message: "Contact number not found" });
      return next();
    }

    const otp = generateOTP();
    req.session.adminLogin = { user, otp };

    // const otpSent = await sendOTP(user.contactNo, otp);
    // if (!otpSent) {
    //   res.status(500).json({ success: false, message: "Failed to send OTP" });
    //   return next();
    // }

    res.status(200).json({ success: true, message: "OTP sent successfully" });
    next();
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    next();
  }
};

export const verifyLoginOtp = async (req: Request, res: Response, next: any): Promise<void> => {
  try {
    const { otp } = req.body;
    const { adminLogin } = req.session;

    if (!otp) {
      res.status(400).json({ success: false, message: "OTP is required" });
      return next();
    }

    if (!adminLogin) {
      res.status(400).json({ success: false, message: "OTP was not sent" });
      return next();
    }

    if (String(otp) !== adminLogin.otp) {
      res.status(400).json({ success: false, message: "Invalid OTP" });
      return next();
    }
    const { username, id, privilege } = adminLogin.user;
    res.status(200).json({
      success: true, message: "Login successful", user: {
        username, id, privilege
      }
    });
    next();
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    next();
  }
}
