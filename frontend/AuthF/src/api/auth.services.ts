import api from './config';

// Define types for authentication
export interface LoginCredentials {
  email: string;
  password: string;
  userType: 'Admin' | 'User';
}

export interface SignupCredentials {
  email: string;
  password: string;
  name?: string;
  userType: 'Admin' | 'User';
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    userType: string;
    name?: string;
  };
}

// Authentication service functions
const AuthService = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Store the token in localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userType', response.data.user.userType);
    }
    
    return response.data;
  },
  
  // Signup function
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signup', credentials);
    
    // Store the token in localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userType', response.data.user.userType);
    }
    
    return response.data;
  },
  
  // Logout function
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem('authToken') !== null;
  },
  
  // Get user type
  getUserType: (): string | null => {
    return localStorage.getItem('userType');
  }
};

export default AuthService;
