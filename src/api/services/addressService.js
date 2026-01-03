import apiClient from '../axiosConfig';

export const addressService = {
  getAddresses: () => {
    return apiClient.get('/customer/addresses');
  },

  addAddress: (addressData) => {
    return apiClient.post('/customer/addresses', addressData);
  },

  updateAddress: (id, addressData) => {
    return apiClient.put(`/customer/addresses/${id}`, addressData);
  },

  deleteAddress: (id) => {
    return apiClient.delete(`/customer/addresses/${id}`);
  },
};
