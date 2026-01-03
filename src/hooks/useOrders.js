import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../api/services/orderService';

// Get order history
export const useOrders = (filters = {}) => {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => orderService.getOrders(filters),
  });
};

// Get single order
export const useOrder = (orderId) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
  });
};

// Create order (authenticated)
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData) => orderService.createOrder(orderData),
    onSuccess: () => {
      // Invalidate orders list to refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// Guest checkout
export const useGuestCheckout = () => {
  return useMutation({
    mutationFn: (orderData) => orderService.guestCheckout(orderData),
  });
};
