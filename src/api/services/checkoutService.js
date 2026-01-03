import apiClient from '../axiosConfig';

export const checkoutService = {
  // Get active payment methods
  getPaymentMethods: () => {
    return apiClient.get('/payment-methods');
  },

  // Get active shipping methods
  getShippingMethods: () => {
    return apiClient.get('/shipping-methods');
  },
};
