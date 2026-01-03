import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressService } from '../api/services/addressService';

export const useAddresses = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressService.getAddresses(),
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (addressData) => addressService.addAddress(addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => addressService.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => addressService.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};
