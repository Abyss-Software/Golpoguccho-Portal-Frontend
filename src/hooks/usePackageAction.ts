import { packageApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function usePackageAction() {
  const queryClient = useQueryClient();
  const createPackageMutation = useMutation({
    mutationFn: packageApi.createPackage,
    onMutate: () => {
      notifications.show({
        id: 'packageCreation',
        loading: true,
        title: 'Creating new event type...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(['event-types']);
    },
  });

  const fetchPackages = () =>
    useQuery({
      queryKey: ['event-types'],
      queryFn: async () => await packageApi.getPackages(),
    });

  const updatePackageMutation = useMutation({
    mutationFn: packageApi.updatePackage,
    onMutate: () => {
      notifications.show({
        id: 'packageUpdate',
        loading: true,
        title: 'Updating event type...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(['event-types']);
    },
  });

  const deletePackageMutation = useMutation({
    mutationFn: packageApi.deletePackage,
    onMutate: () => {
      notifications.show({
        id: 'packageDelete',
        loading: true,
        title: 'Deleting event type...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(['event-types']);
    },
  });

  return {
    createPackageMutation,
    fetchPackages,
    updatePackageMutation,
    deletePackageMutation,
  };
}

export default usePackageAction;
