import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../api/services/categoryService';

export const useCategories = (filters = {}) => {
  return useQuery({
    queryKey: ['categories', filters],
    queryFn: () => categoryService.getAllCategories(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
  });
};

export const useCategoryTree = (showInMenu = true) => {
  return useQuery({
    queryKey: ['category-tree', showInMenu],
    queryFn: () => categoryService.getCategoryTree({ menu: showInMenu ? 1 : 0 }),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useCategory = (slug) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};
