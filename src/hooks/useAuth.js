import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/services/authService';

// Get current user profile
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getProfile(),
    staleTime: 5 * 60 * 1000,
    retry: false, // Don't retry if unauthorized
  });
};

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('customer', JSON.stringify(data.data.customer));
      // Invalidate profile to refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('customer', JSON.stringify(data.data.customer));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// Google login mutation
export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (googleData) => authService.googleLogin(googleData),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('customer', JSON.stringify(data.data.customer));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('customer');
      queryClient.clear(); // Clear all cache
    },
  });
};

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (passwordData) => authService.changePassword(passwordData),
  });
};
