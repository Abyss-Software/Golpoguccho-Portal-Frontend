import { eventApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function useBookingAction() {
  const queryClient = useQueryClient();

  const fetchEvents = () =>
    useQuery({
      queryKey: ['events'],
      queryFn: async () => await eventApi.getAllEvents(),
    });

  const fetchEventsByClientId = (clientId: string) =>
    useQuery({
      enabled: !!clientId,
      queryKey: ['clientEvents', clientId],
      queryFn: async () => await eventApi.getEventByClientId(clientId),
    });

  const fetchEventsByBookingId = (bookingId: string) =>
    useQuery({
      enabled: !!bookingId,
      queryKey: ['bookingEvents', bookingId],
      queryFn: async () => await eventApi.getEventByBookingId(bookingId),
    });

  const fetchEventById = (id: string) =>
    useQuery({
      enabled: !!id,
      queryKey: ['eventDetails', id],
      queryFn: async () => await eventApi.getEventById(id),
    });

  const assignEmployeesMutation = useMutation({
    mutationFn: eventApi.assignEmployees,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'assignEmployees',
        loading: true,
        title: 'Assigning Employees to event',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['eventDetails']);
    },
  });

  return {
    fetchEvents,
    fetchEventsByClientId,
    fetchEventById,
    fetchEventsByBookingId,
    assignEmployeesMutation,
  };
}

export default useBookingAction;
