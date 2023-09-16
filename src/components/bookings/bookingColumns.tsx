import { IBookings } from '@/interfaces/bookings.interface';

export const bookingColumns = () => [
  {
    name: 'Booking Title',
    selector: (row: IBookings) => row.bookingTitle,
    sortable: false,
  },
  {
    name: 'Client Name',
    selector: (row: IBookings) => row.fullName,
    sortable: false,
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
    sortable: false,
  },
  {
    name: 'Created At',
    selector: (row: IBookings) => new Date(row.createdAt).toLocaleString(),
    sortable: false,
  },
];
