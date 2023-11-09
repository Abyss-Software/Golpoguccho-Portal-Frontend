import { IEvent } from '@/interfaces/event.interface';

export const eventColumns = () => [
  {
    name: 'Event Title',
    selector: (row: IEvent) => row.title,
    sortable: true,
  },
  {
    name: 'Package',
    selector: (row: IEvent) => row.package.title,
    sortable: true,
  },
  {
    name: 'Event Date',
    selector: (row: IEvent) => new Date(row.event_date).toLocaleDateString(),
    sortable: true,
  },
  {
    name: 'Time',
    selector: (row: IEvent) => row.start_time,
    sortable: false,
  },
  {
    name: 'Venue',
    selector: (row: IEvent) => row.venue,
    sortable: false,
  },
  {
    name: 'Dahaka or Outside',
    selector: (row: IEvent) => row.dhaka_or_outside,
    sortable: false,
  },
];
