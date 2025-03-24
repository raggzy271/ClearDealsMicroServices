import { Request, Response } from "express";
import "express-session";
import AdminUser from "../models/AdminUser";
import { generateOTP, sendOTP } from "../services/otpservices";

export const loginStep1 = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username } = req.body;
    if (!username)
      return res.status(400).json({ message: "Username is required" });

    const user = await AdminUser.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    req.session["adminLogin"] = {
      otp,
      mobile_no: user.contactNo,
      email: user.email,
    };
    if (user.contactNo != null) {
      const otpSent = await sendOTP(user.contactNo, otp);

      if (!otpSent)
        return res.status(500).json({ message: "Failed to send OTP" });
    }
    return res
      .status(200)
      .json({ message: "OTP sent successfully", email: user.email });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
