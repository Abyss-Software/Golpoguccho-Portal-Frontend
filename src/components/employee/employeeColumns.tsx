import { IEmployee, IUpdateEmployee } from '@/interfaces/employees.interface';
import { Button } from '@mantine/core';
import { AiFillEdit } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

export const employeeColumns = ({
  onEmployeeUpdate,
  onEmployeeDelete,
}: {
  onEmployeeUpdate: (data: IUpdateEmployee) => void;
  onEmployeeDelete: (data: IEmployee) => void;
}) => [
  {
    name: 'Name',
    selector: (row: IEmployee) => row.user.name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: (row: IEmployee) => row.user.email,
    sortable: true,
  },
  {
    name: 'Contact',
    selector: (row: IEmployee) => row.contactPrimary,
    sortable: true,
  },
  {
    name: 'Address',
    selector: (row: IEmployee) => row.address,
    sortable: true,
  },
  {
    name: 'Action',
    center: true,
    cell: (row: IEmployee) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            onClick={() =>
              onEmployeeUpdate({
                id: row.id,
                name: row.user.name,
                email: row.user.email,
                contactPrimary: row.contactPrimary,
                contactSecondary: row.contactSecondary,
                address: row.address,
                role: row.user.role,
                position: row.position,
                verificationType: row.verificationType,
                verificationId: row.verificationId,
                baseSalary: row.baseSalary,
                monthlySalary: row.monthlySalary,
              })
            }
            variant="outline"
          >
            <AiFillEdit size="1.5rem" color="green" />
          </Button>

          <Button
            onClick={() => onEmployeeDelete(row)}
            variant="outline"
            color="red"
          >
            <BiTrash size="1.5rem" color="red" />
          </Button>
        </div>
      );
    },
  },
];
