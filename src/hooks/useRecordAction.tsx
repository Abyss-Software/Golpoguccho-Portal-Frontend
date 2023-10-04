import { recordsApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function useRecordAction() {
  const queryClient = useQueryClient();

  const createRecordMutation = useMutation({
    mutationFn: recordsApi.createRecord,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'recordCreation',
        loading: true,
        title: 'Adding new record...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['records']);
    },
  });

  const fetchRecords = () =>
    useQuery({
      queryKey: ['records'],
      queryFn: async () => await recordsApi.getRecords(),
    });

  const fetchRecordsBetweenMutation = useMutation({
    mutationFn: recordsApi.getRecordsBetween,
    mutationKey: ['monthlyCounts'],
  });

  const deleteRecordMutation = useMutation({
    mutationFn: recordsApi.deleteRecord,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'recordDelete',
        loading: true,
        title: 'Deleting record...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['records']);
    },
  });

  return {
    createRecordMutation,
    fetchRecords,
    fetchRecordsBetweenMutation,
    deleteRecordMutation,
  };
}

export default useRecordAction;
