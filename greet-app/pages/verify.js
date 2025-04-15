import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, otp } = req.body;

  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found." });

  if (user.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP." });

  user.verified = true;
  user.otp = null;
  await user.save();

  return res.status(200).json({ message: "Account verified." });
}
