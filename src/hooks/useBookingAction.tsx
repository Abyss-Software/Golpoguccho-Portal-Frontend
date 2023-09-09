import { bookingApi } from '@/api';
import { useMutation } from '@tanstack/react-query';

function useBookingAction() {
  const calculatePaymentMutation = useMutation({
    mutationFn: bookingApi.calculatePayment,
    onMutate: () => {},
    onSuccess: () => {},
  });

  return {
    calculatePaymentMutation,
  };
}

export default useBookingAction;
