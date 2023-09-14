import { eventApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function useEventAction() {
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

  const fetchEventsByEmployeeId = (employeeId: string) =>
    useQuery({
      enabled: !!employeeId,
      queryKey: ['employeeEvents', employeeId],
      queryFn: async () => await eventApi.getEventByEmployeeId(employeeId),
    });

  const updateEventStatusMutation = useMutation({
    mutationFn: eventApi.updateEventStatus,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'updateEventStatus',
        loading: true,
        title: 'Updating Event Status',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
    },
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
    fetchEventsByEmployeeId,
    updateEventStatusMutation,
    assignEmployeesMutation,
  };
}

export default useEventAction;
