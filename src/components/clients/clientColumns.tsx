import { IClient } from '@/interfaces/clients.interface';
import { Button } from '@mantine/core';
import { BiTrash } from 'react-icons/bi';

const dateSort = (rowA: any, rowB: any) => {
  let dateA = rowA.createdAt ? new Date(rowA.createdAt).getTime() : 0;
  let dateB = rowB.createdAt ? new Date(rowB.createdAt).getTime() : 0;

  return dateA > dateB ? 1 : -1;
};

export const clientColumns = ({
  onClientDelete,
}: {
  onClientDelete: (data: IClient) => void;
}) => [
  {
    name: 'Name',
    selector: (row: IClient) => row.name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: (row: IClient) => row.email,
    sortable: true,
  },
  {
    name: 'Bookings',
    selector: (row: IClient) => row.bookings?.length ?? 0,
    sortable: true,
  },
  {
    name: 'Created At',
    id: 'createdAt',
    selector: (row: IClient) =>
      new Date(row.createdAt).toLocaleDateString('en-GB').split('T')[0],
    sortable: true,
    sortFunction: dateSort,
  },

  {
    name: 'Action',
    center: true,
    cell: (row: IClient) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onClientDelete(row)}
            variant="outline"
            color="red"
            size="xs"
            disabled={row.bookings?.length > 0}
          >
            <BiTrash size="1.5rem" color="red" />
          </Button>
        </div>
      );
    },
  },
];
