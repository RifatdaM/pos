import apiClient from '../axiosConfig';

export const categoryService = {
  // Get all categories (paginated)
  getAllCategories: (params = {}) => {
    return apiClient.get('/product-categories', { params });
  },

  // Get categories as tree (for navigation menu)
  getCategoryTree: (params = {}) => {
    return apiClient.get('/product-categories/tree', { params });
  },

  // Get single category
  getCategoryBySlug: (slug) => {
    return apiClient.get(`/product-categories/${slug}`);
  },
};
