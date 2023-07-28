import { Table } from '@mantine/core';
import React from 'react';

const PreviousBookings = () => {
  return (
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
          <th>Payment</th>
          <th>Booking Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((booking) => (
          <tr key={booking.BookingTitle}>
            <td>{booking.BookingTitle}</td>
            <td>{booking.BookingDate}</td>
            <td>{booking.Events}</td>
            <td>{booking.PaymentStatus}</td>
            <td>{booking.BookingStatus}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PreviousBookings;

const data = [
  {
    BookingTitle: 'Booking 001',
    BookingDate: '2023-07-27',
    Events: 2,
    PaymentStatus: 'Paid',
    BookingStatus: 'Confirmed',
  },
  {
    BookingTitle: 'Booking 002',
    BookingDate: '2023-08-15',
    Events: 1,
    PaymentStatus: 'Pending',
    BookingStatus: 'Pending',
  },
  {
    BookingTitle: 'Booking 003',
    BookingDate: '2023-09-02',
    Events: 3,
    PaymentStatus: 'Unpaid',
    BookingStatus: 'Cancelled',
  },
  {
    BookingTitle: 'Booking 004',
    BookingDate: '2023-09-18',
    Events: 1,
    PaymentStatus: 'Paid',
    BookingStatus: 'Confirmed',
  },
];
