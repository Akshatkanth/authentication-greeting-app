// pages/api/verifyOtp.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Please provide both email and OTP." });
  }

  // Connect to the database
  await dbConnect();

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Check if OTP matches
  if (user.otp === otp) {
    // OTP is correct, mark the user as verified or complete registration
    user.verified = true; // Add a verified field if it doesn't exist
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully. User is now verified." });
  } else {
    return res.status(400).json({ message: "Invalid OTP. Please try again." });
  }
}
