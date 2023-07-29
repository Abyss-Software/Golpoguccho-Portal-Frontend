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
    <div>
      <h1 className="text-2xl p-4">List of Bookings</h1>
      <Card withBorder shadow="lg">
        <CommonDataTable<IBookings>
          data={data}
          columns={columns}
          handleRowClick={handleRowClick}
        />
      </Card>
    </div>
  );
};

export default BookingListPage;
