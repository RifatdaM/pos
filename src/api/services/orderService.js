import apiClient from '../axiosConfig';

export const orderService = {
  // Guest checkout
  guestCheckout: (orderData) => {
    return apiClient.post('/orders/guest-checkout', orderData);
  },

  // Authenticated user order
  createOrder: (orderData) => {
    return apiClient.post('/orders', orderData);
  },

  // Get customer order history
  getOrders: (params = {}) => {
    return apiClient.get('/orders', { params });
  },

  // Get specific order details
  getOrderById: (orderId) => {
    return apiClient.get(`/orders/${orderId}`);
  },
};
