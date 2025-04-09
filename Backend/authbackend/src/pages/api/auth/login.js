// Backend/authbackend/src/pages/api/auth/login.js
import { connectToDatabase } from '../../../utils/database';
import errorHandler from '../../../middleware/errorHandler';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { email, password, userType } = req.body;
    
    // Validate input
    if (!email || !password || !userType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Here you would implement your actual authentication logic
    // For example, checking credentials against a database
    
    // Mock successful authentication
    const user = {
      id: '123456',
      email,
      userType,
      name: 'Test User'
    };
    
    const token = 'mock-jwt-token';
    
    return res.status(200).json({
      token,
      user
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
}
