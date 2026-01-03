import apiClient from '../axiosConfig';

export const pageService = {
  getAllPages: () => {
    return apiClient.get('/pages');
  },

  getHomePage: () => {
    return apiClient.get('/pages/home');
  },

  getPageBySlug: (slug) => {
    return apiClient.get(`/pages/by-slug/${slug}`);
  },

  getPageById: (id) => {
    return apiClient.get(`/pages/${id}`);
  },
};
