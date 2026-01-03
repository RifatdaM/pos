import apiClient from '../axiosConfig';

export const attributeService = {
  getAllAttributes: (params = {}) => {
    return apiClient.get('/attributes', { params });
  },

  getAttributeById: (identifier) => {
    return apiClient.get(`/attributes/${identifier}`, { params: { with_values: 1 } });
  },

  getAllAttributeValues: (params = {}) => {
    return apiClient.get('/attribute-values', { params });
  },

  getAttributeValueById: (identifier) => {
    return apiClient.get(`/attribute-values/${identifier}`);
  },
};
