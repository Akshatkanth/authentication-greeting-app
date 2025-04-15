// pages/api/login.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  if (user.isBlocked) {
    return res.status(403).json({ message: "You are blocked by the admin." });
  }

  if (!user.isVerified) {
    return res.status(403).json({ message: "Please verify your email first." });
  }

  if (!user.isAccepted) {
    return res.status(403).json({ message: "Waiting for admin approval." });
  }

  // If all checks passed
  return res.status(200).json({ message: "Login successful.", user: {
    name: user.name,
    email: user.email
  }});
}
