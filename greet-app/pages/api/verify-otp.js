// pages/api/verify-otp.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  user.isVerified = true;
  user.otp = null; // Clear OTP after verification
  await user.save();

  return res.status(200).json({ message: "User verified successfully." });
}
