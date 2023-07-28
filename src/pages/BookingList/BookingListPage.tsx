import BookingsTable from '@/components/bookingTable/BookingTable';
import CommonDataTable from '@/components/dataTable/CommonDataTable';
import { IBookings } from '@/interfaces/bookings.interface';
import React from 'react';
import { data, columns } from '@/constants/dummyData';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mantine/core';

const BookingListPage = () => {
  const navigate = useNavigate();
  const handleRowClick = (row: IBookings) => {
    navigate(`/booking-details`);
  };
  return (
    <Card withBorder shadow="lg">
      <h1>List of Bookings</h1>
      <CommonDataTable<IBookings>
        data={data}
        columns={columns}
        handleRowClick={handleRowClick}
      />
    </Card>
  );
};

export default BookingListPage;
