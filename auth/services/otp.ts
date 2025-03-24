import sns from "../config/aws";

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const sendOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
  try {
    const params = {
      Message: `Your OTP for Clear Deals Admin is: ${otp}. Do not share with anyone.`,
      PhoneNumber: phoneNumber,
    };

    await sns.publish(params).promise();
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};