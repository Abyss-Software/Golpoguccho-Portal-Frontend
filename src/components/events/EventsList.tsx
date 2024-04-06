import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

export type Event = {
  eventTitle: string;
  package: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  dhakaOrOutside: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    eventTitle: 'Birthday Party',
    package: 'Gold',
    eventDate: '2024-04-15',
    eventTime: '18:00',
    venue: '123 Main Street',
    dhakaOrOutside: 'Outside',
  },
  {
    eventTitle: 'Wedding Ceremony',
    package: 'Platinum',
    eventDate: '2024-06-20',
    eventTime: '15:30',
    venue: '456 Park Avenue',
    dhakaOrOutside: 'Dhaka',
  },
  {
    eventTitle: 'Conference',
    package: 'Silver',
    eventDate: '2024-09-10',
    eventTime: '09:00',
    venue: '789 Conference Center',
    dhakaOrOutside: 'Outside',
  },
  {
    eventTitle: 'Music Concert',
    package: 'VIP',
    eventDate: '2024-07-05',
    eventTime: '20:00',
    venue: '101 Stadium Road',
    dhakaOrOutside: 'Outside',
  },
  {
    eventTitle: 'Business Expo',
    package: 'Standard',
    eventDate: '2024-11-15',
    eventTime: '10:00',
    venue: '111 Exhibition Hall',
    dhakaOrOutside: 'Dhaka',
  },
];

const EventListing = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'eventTitle', //access nested data with dot notation
        header: 'Event Title',
      },
      {
        accessorKey: 'package',
        header: 'Package',
      },
      {
        accessorKey: 'eventDate', //normal accessorKey
        header: 'Event Date',
      },
      {
        accessorKey: 'eventTime',
        header: 'Event Time',
      },
      {
        accessorKey: 'venue',
        header: 'Venue',
      },
      {
        accessorKey: 'dhakaOrOutside',
        header: 'Dhaka or Outside',
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableRowNumbers: true,
    mantinePaginationProps: {
      rowsPerPageOptions: ['10', '20', '50', '100'],
      withEdges: false,
    },
    initialState: {
      sorting: [
        {
          id: 'eventDate',
          desc: true,
        },
      ],
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        console.info(row.id);
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),
  });

  return <MantineReactTable table={table} />;
};

export default EventListing;
