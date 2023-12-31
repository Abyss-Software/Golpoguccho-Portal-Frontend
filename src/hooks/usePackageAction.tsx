import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { packageApi } from '@/api';
import { PackageCreate } from '@/components/package/PackageCreateForm';
import { notifications } from '@mantine/notifications';

function usePackageAction() {
  const queryClient = useQueryClient();

  const createPackageMutation = useMutation({
    mutationFn: (data: { eventTypeId: string } & PackageCreate) =>
      packageApi.createPackage(data.eventTypeId, data),
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'packageCreation',
        loading: true,
        title: 'Creating new package...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: (_, variables: { eventTypeId: string } & PackageCreate) => {
      queryClient.invalidateQueries(['event-type', variables.eventTypeId]);
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
        withBorder: true,
        id: 'packageUpdate',
        loading: true,
        title: 'Updating Package...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['event-type']);
    },
  });

  const deletePackageMutation = useMutation({
    mutationFn: packageApi.deletePackage,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'packageDelete',
        loading: true,
        title: 'Deleting event type...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['event-type']);
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
