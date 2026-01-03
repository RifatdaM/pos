import apiClient from '../axiosConfig';

export const productService = {
  // Get all products with filters
  getAllProducts: (params = {}) => {
    return apiClient.get('/products', { params });
  },

  // Get single product by slug
  getProductBySlug: (slug) => {
    return apiClient.get(`/products/${slug}`);
  },

  // POS specific: Get products for POS
  getPOSProducts: (params = {}) => {
    return apiClient.get('/pos-products', { params });
  },

  // POS specific: Get product by barcode
  getProductByBarcode: (barcode) => {
    return apiClient.get(`/pos-products/barcode/${barcode}`);
  },
};
