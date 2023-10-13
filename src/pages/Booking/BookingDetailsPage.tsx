import { Accordion, Button, Table } from '@mantine/core';

import { AdminSpecific } from '@/components/bookingDetails/AdminSpecific';
import { AfterPaymentClient } from '@/components/bookingDetails/AfterPaymentClient';
import DuePaymentForm from '@/components/bookingDetails/DuePaymentForm';
import EventDetails from '@/components/bookingDetails/EventDetails';
import { ThemeContext } from '@/contexts/ThemeContext';
import { UserRoles } from '@/constants/userRoles';
import { modals } from '@mantine/modals';
import { useAuthStore } from '@/contexts/authContext';
import useBookingAction from '@/hooks/useBookingAction';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

const BookingDetailsPage = () => {
  const { darkMode } = useContext(ThemeContext);

  const { userInfo } = useAuthStore();

  let { id } = useParams();

  const { fetchBookingById, changeStatusMutation } = useBookingAction();

  const { data: bookingData } = fetchBookingById(id!);

  const handleMakeDuePayment = (bookingId: string, duePayment: number) => {
    modals.open({
      title: 'Make Due Payment',
      centered: true,
      size: 'lg',
      children: (
        <DuePaymentForm bookingId={bookingId} duePayment={duePayment} />
      ),
    });
  };

  if (!bookingData)
    return (
      <div className="h-96 mx-auto pb-4 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dl8vvdyc5/image/upload/v1697100893/Assets/loader.svg"
          alt="loader"
          className="h-32"
        />
      </div>
    );

  return (
    <div className=" mx-auto p-4 lg:p-10">
      <div className="bg-primaryColor text-white p-4 rounded-lg mb-10">
        <h2 className="text-2xl font-bold">Booking Details</h2>
      </div>
      <div className="mb-4 xl:mb-10">
        <h3 className="text-2xl font-semibold text-primaryColor mb-2 uppercase">
          Personal Information
        </h3>
        <div className="p-4 space-y-1">
          <p>
            <span className="font-bold">Full Name:</span>{' '}
            {bookingData?.fullName}
          </p>
          <p>
            <span className="font-bold">Email:</span> {bookingData?.email}
          </p>
          <p>
            <span className="font-bold">Primary Contact:</span>{' '}
            {bookingData?.contactPrimary}
          </p>
          <p>
            <span className="font-bold">Secondary Contact:</span>{' '}
            {bookingData?.contactSecondary}
          </p>
          <p>
            <span className="font-bold">Address:</span> {bookingData?.address}
          </p>
          <p>
            <span className="font-bold">City:</span> {bookingData?.city}
          </p>
          <p>
            <span className="font-bold">Booking Date:</span>{' '}
            {new Date(bookingData?.createdAt).toLocaleDateString()}
          </p>

          <p>
            <span className="font-bold">Promo Code:</span>{' '}
            {bookingData?.promoCode ? bookingData?.promoCode : 'N/A'}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-primaryColor mb-2 uppercase">
          Events
        </h3>
        <Accordion
          variant="contained"
          defaultValue={[`${0}`]}
          transitionDuration={500}
          multiple
          className={`${!darkMode && 'bg-[#fafafa]'}`}
        >
          {bookingData?.events?.map((event: any, index: number) => (
            <EventDetails key={event} event={event} index={index} />
          ))}
        </Accordion>
      </div>
      <hr className="h-px my-8 mx-96 bg-gray-400 border-0 dark:bg-gray-700" />
      <div className="mb-4 xl:mb-10">
        <h3 className="text-2xl font-semibold text-primaryColor mb-2 uppercase">
          Payment Information
        </h3>

        <p className="text-base font-semibold mb-2">
          Status: {bookingData?.status}
        </p>

        {userInfo?.role == UserRoles.CLIENT &&
          bookingData?.status == 'CONFIRMED' && (
            <Button
              className="ml-auto"
              onClick={() => {
                handleMakeDuePayment(bookingData?.id, bookingData?.duePayment);
              }}
            >
              Make Due Payment
            </Button>
          )}

        <div className="p-4 space-y-1 overflow-auto">
          <Table
            striped
            highlightOnHover
            withBorder
            verticalSpacing="md"
            fontSize="md"
            captionSide="bottom"
          >
            <caption>Total Payment: {bookingData?.totalPayment}</caption>
            <thead>
              <tr>
                <th>Payment Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Advance Payment</td>
                <td>{bookingData?.advancePayment}</td>
                <td>
                  {new Date(bookingData?.advancePaymentDate).toDateString()}
                </td>
                <td>{bookingData?.advancePaymentMethod}</td>
                <td>{bookingData?.advanceTransactionId}</td>
              </tr>
              <tr>
                <td>Due Payment</td>
                <td>{bookingData?.duePayment}</td>
                {bookingData?.duePaymentDate ? (
                  <td>
                    {' '}
                    {new Date(bookingData?.duePaymentDate).toDateString()}
                  </td>
                ) : (
                  <td> </td>
                )}
                <td>{bookingData?.duePaymentMethod}</td>
                <td>{bookingData?.dueTransactionId}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        {userInfo?.role == UserRoles.CLIENT &&
          bookingData?.status == 'COMPLETED' && (
            <AfterPaymentClient bookingData={bookingData} />
          )}
        {(userInfo?.role == UserRoles.ADMIN ||
          userInfo?.role == UserRoles.MODERATOR) && (
          <div>
            <AdminSpecific bookingData={bookingData} />
          </div>
        )}
      </div>
    </div>
  );
};
export default BookingDetailsPage;
