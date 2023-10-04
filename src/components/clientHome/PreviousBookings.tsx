import { useAuthStore } from '@/contexts/authContext';
import useBookingAction from '@/hooks/useBookingAction';
import noData from '@/assets/svg/no-data-animate.svg';
import { Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const PreviousBookings = () => {
  const { userInfo } = useAuthStore();

  const { fetchBookingsByClientId } = useBookingAction();
  const { data: bookings } = fetchBookingsByClientId(userInfo?.id!);

  const navigate = useNavigate();

  return (
    <div>
      {!bookings?.length ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl text-center mt-8">No Past Bookings</h1>
          <object
            data={noData}
            type="image/svg+xml"
            className="max-w-lg mx-auto mt-8"
          />
        </div>
      ) : (
        <div className="py-5 px-5 md:py-10 text-center space-y-2">
          <h2>Previous Bookings</h2>
          <div className="md:px-10 overflow-auto text-start">
            <Table
              striped
              highlightOnHover
              withBorder
              verticalSpacing="md"
              fontSize="md"
              captionSide="bottom"
            >
              <caption>Thank you for entrusting us</caption>
              <thead>
                <tr>
                  <th>Booking Title</th>
                  <th>Booking Date</th>
                  <th>Events</th>
                  <th>Total Payment</th>
                  <th>Booking Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking: any) => (
                  <tr
                    key={booking.BookingTitle}
                    onClick={() => {
                      navigate(`/client/booking-details/${booking.id}`);
                    }}
                    className="cursor-pointer"
                  >
                    <td>{booking.bookingTitle}</td>
                    <td>{new Date(booking.createdAt).toDateString()}</td>
                    <td>{booking.events.length}</td>
                    <td>{booking.totalPayment}</td>
                    <td>{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousBookings;
