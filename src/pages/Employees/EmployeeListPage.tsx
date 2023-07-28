import BookingsTable from '@/components/bookingTable/BookingTable';
import CommonDataTable from '@/components/dataTable/CommonDataTable';
import { IBookings } from '@/interfaces/bookings.interface';
import React from 'react';
import { employeeData } from '@/constants/dummyData';
import { employeesColumns } from '@/interfaces/employees.interface';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mantine/core';
import { IEmployees } from '@/interfaces/employees.interface';

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const handleRowClick = (row: IEmployees) => {
    navigate(`/emp`);
  };

  return (
    <Card withBorder shadow="lg" className="mt-2">
      <h1>List of Employees</h1>
      <CommonDataTable<IEmployees>
        data={employeeData}
        columns={employeesColumns}
        handleRowClick={handleRowClick}
      />
    </Card>
  );
};

export default EmployeeListPage;
