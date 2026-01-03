import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { productService } from '../api/services/productService';

// Get all products with filters
export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getAllProducts(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes for product list
  });
};

// Infinite scroll for products
export const useInfiniteProducts = (filters = {}) => {
  return useInfiniteQuery({
    queryKey: ['products-infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      productService.getAllProducts({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.current_page;
      const lastPageNum = lastPage.data.last_page;
      return currentPage < lastPageNum ? currentPage + 1 : undefined;
    },
  });
};

// Get single product
export const useProduct = (slug) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug, // Only run if slug exists
    staleTime: 5 * 60 * 1000, // 5 minutes for single product
  });
};

// POS: Get products
export const usePOSProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['pos-products', filters],
    queryFn: () => productService.getPOSProducts(filters),
  });
};

// POS: Get product by barcode
export const useProductByBarcode = (barcode) => {
  return useQuery({
    queryKey: ['product-barcode', barcode],
    queryFn: () => productService.getProductByBarcode(barcode),
    enabled: !!barcode && barcode.length > 3,
  });
};
