import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found." });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ message: "Invalid password." });

  if (user.blocked) {
    return res.status(403).json({ status: "blocked" });
  }

  if (!user.verified) {
    return res.status(403).json({ status: "pending" });
  }

  return res.status(200).json({ status: "success", name: user.name });
}
