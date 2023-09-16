import CommonDataTable from '@/components/dataTable/CommonDataTable';
import { IBookings } from '@/interfaces/bookings.interface';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@mantine/core';
import useBookingAction from '@/hooks/useBookingAction';
import { bookingColumns } from '@/components/bookings/bookingColumns';
import useEventAction from '@/hooks/useEventAction';
import { notifications } from '@mantine/notifications';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';

const BookingListPage = () => {
  const navigate = useNavigate();
  const { fetchBookings } = useBookingAction();
  const { data: bookings } = fetchBookings();

  const handleRowClick = (row: IBookings) => {
    navigate(`/admin/booking-details/${row.id}`);
  };

  const { updateEventStatusMutation } = useEventAction();

  const handleUpdateEventStatus = () => {
    updateEventStatusMutation.mutate(void 0, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'updateEventStatus',
          color: 'green',
          title: 'Success',
          message: 'Event Status Updated',
          icon: <CheckIcon size="2rem" />,
        });
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'updateEventStatus',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl ">List of Bookings</h1>
        <Button
          variant="filled"
          color="primary"
          size="md"
          onClick={handleUpdateEventStatus}
        >
          Update Event Status
        </Button>
      </div>
      <Card withBorder shadow="lg">
        {bookings?.body && (
          <CommonDataTable<IBookings>
            data={bookings?.body!}
            columns={bookingColumns()}
            handleRowClick={handleRowClick}
          />
        )}
      </Card>
    </div>
  );
};

export default BookingListPage;
