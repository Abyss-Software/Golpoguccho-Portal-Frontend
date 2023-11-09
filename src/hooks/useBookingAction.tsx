import { bookingApi } from '@/api';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function useBookingAction() {
  const queryClient = useQueryClient();

  const calculatePaymentMutation = useMutation({
    mutationFn: bookingApi.calculatePayment,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'priceValidation',
        loading: true,
        title: 'Calculating Pricing...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {},
  });

  const createBookingMutation = useMutation({
    mutationFn: bookingApi.createBooking,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'bookingCreation',
        loading: true,
        title: 'Creating Booking...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {},
  });

  const fetchBookings = () =>
    useQuery({
      queryKey: ['bookings'],
      queryFn: async () => await bookingApi.getAllBookings(),
    });

  const fetchBookingsByClientId = (clientId: string) =>
    useQuery({
      enabled: !!clientId,
      queryKey: ['clientBookings', clientId],
      queryFn: async () => await bookingApi.getBookingByClientId(clientId),
    });

  const fetchBookingById = (id: string) =>
    useQuery({
      enabled: !!id,
      queryKey: ['bookingDetails', id],
      queryFn: async () => await bookingApi.getBookingById(id),
    });

  const makeDuePaymentMutation = useMutation({
    mutationFn: bookingApi.makeDuePayment,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'duePayment',
        loading: true,
        title: 'Adding Due Payment Information...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookingDetails']);
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: bookingApi.changeStatus,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'changeStatus',
        loading: true,
        title: 'Changing Status...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookingDetails']);
    },
  });

  const setLinkMutation = useMutation({
    mutationFn: bookingApi.setLink,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'setLink',
        loading: true,
        title: 'Setting Link...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookingDetails']);
    },
  });

  const setAdditionInfoMutation = useMutation({
    mutationFn: bookingApi.setAdditionalInfo,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'setInfo',
        loading: true,
        title: 'Adding booking information...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookingDetails']);
    },
  });

  const giveFeedbackMutation = useMutation({
    mutationFn: bookingApi.giveFeedback,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'giveFeedback',
        loading: true,
        title: 'Giving Feedback...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookingDetails']);
    },
  });

  return {
    calculatePaymentMutation,
    createBookingMutation,
    fetchBookings,
    fetchBookingsByClientId,
    fetchBookingById,
    makeDuePaymentMutation,
    changeStatusMutation,
    setLinkMutation,
    setAdditionInfoMutation,
    giveFeedbackMutation,
  };
}

export default useBookingAction;
