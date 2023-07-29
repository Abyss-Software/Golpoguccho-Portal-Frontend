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
    <div>
      <h1 className="text-2xl p-4">List of Employees</h1>
      <Card withBorder shadow="lg">
        <CommonDataTable<IEmployees>
          data={employeeData}
          columns={employeesColumns}
          handleRowClick={handleRowClick}
        />
      </Card>
    </div>
  );
};

export default EmployeeListPage;
