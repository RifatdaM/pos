import { useQuery } from '@tanstack/react-query';
import { brandService } from '../api/services/brandService';

export const useBrands = (filters = {}) => {
  return useQuery({
    queryKey: ['brands', filters],
    queryFn: () => brandService.getAllBrands(filters),
    staleTime: 10 * 60 * 1000,
  });
};

export const useBrand = (slug) => {
  return useQuery({
    queryKey: ['brand', slug],
    queryFn: () => brandService.getBrandBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};
