import apiClient from '../axiosConfig';

export const authService = {
  // Register new customer
  register: (userData) => {
    return apiClient.post('/customer/register', userData);
  },

  // Login
  login: (credentials) => {
    return apiClient.post('/customer/login', credentials);
  },

  // Google OAuth login
  googleLogin: (googleData) => {
    return apiClient.post('/customer/google-login', googleData);
  },

  // Get profile
  getProfile: () => {
    return apiClient.get('/customer/profile');
  },

  // Logout
  logout: () => {
    return apiClient.post('/customer/logout');
  },

  // Logout all devices
  logoutAll: () => {
    return apiClient.post('/customer/logout-all');
  },

  // Change password
  changePassword: (passwordData) => {
    return apiClient.put('/customer/change-password', passwordData);
  },
};
