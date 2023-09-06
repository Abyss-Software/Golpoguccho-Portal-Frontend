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
        title: 'Creating new package...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(['packages']);
    },
  });

  const fetchPackages = () =>
    useQuery({
      queryKey: ['packages'],
      queryFn: async () => await packageApi.getPackages(),
    });

  const updatePackageMutation = useMutation({
    mutationFn: packageApi.updatePackage,
    onMutate: () => {
      notifications.show({
        id: 'packageUpdate',
        loading: true,
        title: 'Updating Package...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(['packages']);
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
      queryClient.invalidateQueries(['packages']);
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
