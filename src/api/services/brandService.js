import apiClient from '../axiosConfig';

export const brandService = {
  getAllBrands: (params = {}) => {
    return apiClient.get('/brands', { params });
  },

  getBrandBySlug: (slug) => {
    return apiClient.get(`/brands/${slug}`);
  },
};
