import CommonDataTable from '@/components/dataTable/CommonDataTable';
import { IBookings } from '@/interfaces/bookings.interface';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mantine/core';
import useBookingAction from '@/hooks/useBookingAction';
import { bookingColumns } from '@/components/bookings/bookingColumns';

const BookingListPage = () => {
  const navigate = useNavigate();
  const { fetchBookings } = useBookingAction();
  const { data: bookings } = fetchBookings();

  console.log(bookings?.body);

  const handleRowClick = (row: IBookings) => {
    navigate(`/admin/booking-details/${row.id}`);
  };

  return (
    <div>
      <h1 className="text-2xl p-4">List of Bookings</h1>
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
