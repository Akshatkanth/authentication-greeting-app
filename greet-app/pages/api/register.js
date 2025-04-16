// pages/api/register.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  await dbConnect();

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists." });

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
  });

  // Send OTP email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kanthakshat@gmail.com',   
      pass: 'mwdc znmx llxj hqqr'         
    }
  });

  await transporter.sendMail({
    from: 'Your Project Name <your-email@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    html: `<h3>Hello ${name},</h3><p>Your OTP is: <strong>${otp}</strong></p>`
  });

  return res.status(200).json({ message: "Registered. OTP sent to email." });
}
