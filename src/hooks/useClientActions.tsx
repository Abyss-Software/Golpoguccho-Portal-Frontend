import { clientApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function useClientAction() {
  const queryClient = useQueryClient();
  const deleteClientMutation = useMutation({
    mutationFn: clientApi.deleteClient,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'deleteClient',
        loading: true,
        title: 'Deleting Client...',
        message: 'Please wait while we are deleting client',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['clients']),
  });

  const fetchClients = () =>
    useQuery({
      queryKey: ['clients'],
      queryFn: clientApi.getClients,
    });

  return {
    deleteClientMutation,
    fetchClients,
  };
}
