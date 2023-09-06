import { eventTypeApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function useEventTypeAction() {
  const queryClient = useQueryClient();
  const createEventTypeMutation = useMutation({
    mutationFn: eventTypeApi.createEventType,
    onMutate: () => {
      notifications.show({
        id: 'eventTypeCreation',
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

  const fetchEventTypes = () =>
    useQuery({
      queryKey: ['event-types'],
      queryFn: async () => await eventTypeApi.getEventTypes(),
    });

  const fetchEventTypeById = (id: string) =>
    useQuery({
      queryKey: ['event-type', id],
      queryFn: async () => await eventTypeApi.getEventTypeById(id),
      enabled: !!id,
    });

  const updateEventTypeMutation = useMutation({
    mutationFn: eventTypeApi.updateEventType,
    onMutate: () => {
      notifications.show({
        id: 'eventTypeUpdate',
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

  const deleteEventTypeMutation = useMutation({
    mutationFn: eventTypeApi.deleteEventType,
    onMutate: () => {
      notifications.show({
        id: 'eventTypeDelete',
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
    createEventTypeMutation,
    fetchEventTypes,
    fetchEventTypeById,
    updateEventTypeMutation,
    deleteEventTypeMutation,
  };
}

export default useEventTypeAction;
