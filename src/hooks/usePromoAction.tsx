import { promoApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function usePromoAction() {
  const queryClient = useQueryClient();
  const createPromoMutation = useMutation({
    mutationFn: promoApi.createPromo,
    onMutate: () => {
      notifications.show({
        id: 'promoCreation',
        loading: true,
        title: 'Creating new promo code...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['promos']);
    },
  });

  const fetchPromos = () =>
    useQuery({
      queryKey: ['promos'],
      queryFn: async () => await promoApi.getPromos(),
    });

  const fetchPromoByCode = (code: string) =>
    useQuery({
      enabled: !!code,
      queryKey: ['promo', code],
      queryFn: async () => await promoApi.getPromoByCode(code),
    });

  const updatePromoMutation = useMutation({
    mutationFn: promoApi.updatePromo,
    onMutate: () => {
      notifications.show({
        id: 'promoUpdate',
        loading: true,
        title: 'Updating promo code...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['promos']);
    },
  });

  const deletePromoMutation = useMutation({
    mutationFn: promoApi.deletePromo,
    onMutate: () => {
      notifications.show({
        id: 'promoDelete',
        loading: true,
        title: 'Deleting promo code...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['promos']);
    },
  });

  return {
    createPromoMutation,
    fetchPromos,
    fetchPromoByCode,
    updatePromoMutation,
    deletePromoMutation,
  };
}

export default usePromoAction;
