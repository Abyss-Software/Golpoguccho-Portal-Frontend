import { IEmployeeEvent } from '@/interfaces/employeeEvents.interface';

export const employeeEventsColumns = () => [
  {
    name: 'Event Date',
    selector: (row: IEmployeeEvent) =>
      row.event && new Date(row.event.event_date).toLocaleDateString('en-GB'),
    sortable: true,
  },
  {
    name: 'Event Title',
    selector: (row: IEmployeeEvent) => row.event?.title,
    sortable: false,
  },
  {
    name: 'Venue',
    selector: (row: IEmployeeEvent) => row.event?.venue,
    sortable: false,
  },
  {
    name: 'Location',
    selector: (row: IEmployeeEvent) => row.event?.dhaka_or_outside,
    sortable: false,
  },

  {
    name: 'Payment',
    selector: (row: IEmployeeEvent) => row.payment,
    sortable: false,
  },
];
