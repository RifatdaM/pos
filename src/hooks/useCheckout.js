import { useQuery } from '@tanstack/react-query';
import { checkoutService } from '../api/services/checkoutService';

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['payment-methods'],
    queryFn: () => checkoutService.getPaymentMethods(),
    staleTime: 30 * 60 * 1000, // 30 minutes - rarely changes
  });
};

export const useShippingMethods = () => {
  return useQuery({
    queryKey: ['shipping-methods'],
    queryFn: () => checkoutService.getShippingMethods(),
    staleTime: 30 * 60 * 1000,
  });
};
