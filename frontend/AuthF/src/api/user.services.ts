import api from './config';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  userType: string;
}

const UserService = {
  // Get current user profile
  getCurrentUser: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/users/me');
    return response.data;
  },
  
  // Update user profile
  updateProfile: async (userData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await api.put<UserProfile>('/users/profile', userData);
    return response.data;
  }
};

export default UserService;
