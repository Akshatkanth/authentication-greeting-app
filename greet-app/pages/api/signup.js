// pages/api/signup.js
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      const newUser = await User.create({ name, email, password });
      return res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
      return res.status(400).json({ error: 'User creation failed', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
