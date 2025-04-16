<<<<<<< HEAD
// pages/api/verifyOtp.js
=======
// pages/api/verify-otp.js
>>>>>>> parent of 75daf31 (otp verification configure)
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
<<<<<<< HEAD
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
=======
  if (req.method !== "POST") return res.status(405).end();
>>>>>>> parent of 75daf31 (otp verification configure)

  const { email, otp } = req.body;

  if (!email || !otp) {
<<<<<<< HEAD
    return res.status(400).json({ message: "Please provide both email and OTP." });
  }

  // Connect to the database
  await dbConnect();

  // Find the user by email
  const user = await User.findOne({ email });
=======
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  await dbConnect();

  const user = await User.findOne({ email });

>>>>>>> parent of 75daf31 (otp verification configure)
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

<<<<<<< HEAD
  // Check if OTP matches
  if (user.otp === otp) {
    // OTP is correct, mark the user as verified or complete registration
    user.verified = true; // Add a verified field if it doesn't exist
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully. User is now verified." });
  } else {
    return res.status(400).json({ message: "Invalid OTP. Please try again." });
  }
=======
  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  user.isVerified = true;
  user.otp = null; // Clear OTP after verification
  await user.save();

  return res.status(200).json({ message: "User verified successfully." });
>>>>>>> parent of 75daf31 (otp verification configure)
}
