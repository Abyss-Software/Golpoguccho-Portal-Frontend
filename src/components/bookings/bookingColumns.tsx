import { IBookings } from '@/interfaces/bookings.interface';

const dateSort = (rowA: any, rowB: any) => {
  let dateA = rowA.createdAt ? new Date(rowA.createdAt).getTime() : 0;
  let dateB = rowB.createdAt ? new Date(rowB.createdAt).getTime() : 0;

  return dateA > dateB ? 1 : -1;
};

export const bookingColumns = () => [
  {
    name: 'Booking Title',
    selector: (row: IBookings) => row.bookingTitle,
    sortable: true,
  },
  {
    name: 'Client Name',
    selector: (row: IBookings) => row.fullName,
    sortable: true,
  },
  {
    name: 'Contact No.',
    selector: (row: IBookings) => row.contactPrimary,
    sortable: false,
  },
  {
    name: 'Email',
    selector: (row: IBookings) => row.email,
    sortable: false,
  },
  {
    name: 'Payment',
    selector: (row: IBookings) => row.totalPayment,
    sortable: false,
  },
  {
    name: 'Status',
    selector: (row: IBookings) => row.status,
    sortable: true,
  },
  {
    name: 'Created',
    selector: (row: IBookings) =>
      new Date(row.createdAt).toLocaleDateString('en-GB').split('T')[0],
    sortable: true,
    id: 'createdAt',
    sortFunction: dateSort,
  },
];
