import { useNavigate } from 'react-router-dom';
import { Card } from '@mantine/core';
import useEventAction from '@/hooks/useEventAction';
import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

const EventsListPage = () => {
  const navigate = useNavigate();
  const { fetchEvents } = useEventAction();
  const { data: events } = fetchEvents();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'booking.id',
        header: 'Booking ID',
        hidden: true,
      },
      {
        accessorKey: 'title',
        header: 'Event Title',
      },
      {
        accessorKey: 'package.title',
        header: 'Package',
      },
      {
        accessorKey: 'event_date',
        accessorFn: (row: any) =>
          new Date(row.event_date).toLocaleDateString('en-GB'),
        header: 'Event Date',
        cell: (info: any) => info.getValue().toLocaleDateString('en-GB'),
        sortingFn: (rowA: any, rowB: any) => {
          // Compare timestamps directly
          let dateA = rowA.original.event_date
            ? new Date(rowA.original.event_date).getTime()
            : 0;
          let dateB = rowB.original.event_date
            ? new Date(rowB.original.event_date).getTime()
            : 0;

          return dateA > dateB ? 1 : -1;
        },
      },

      {
        accessorKey: 'start_time',
        header: 'Event Time',
      },
      {
        accessorKey: 'venue',
        header: 'Venue',
      },
      {
        accessorKey: 'dhaka_or_outside',
        header: 'Dhaka or Outside',
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: events ? events : [],
    enableRowNumbers: true,
    mantineTableProps: {
      striped: true,
    },
    mantinePaperProps: {
      shadow: 'none',
      sx: {
        borderRadius: '0',
        border: '1px dashed #e0e0e0',
      },
    },
    mantinePaginationProps: {
      rowsPerPageOptions: ['10', '20', '50', '100'],
      withEdges: false,
    },
    initialState: {
      density: 'md',
      columnVisibility: {
        'booking.id': false,
      },
      sorting: [
        {
          id: 'event_date',
          desc: true,
        },
      ],
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        navigate(`/admin/booking-details/${row.getValue('booking.id')}`);
      },
      sx: {
        cursor: 'pointer',
        fontWeight: 'normal',
      },
    }),
  });

  return (
    <div>
      <h1 className="text-2xl p-4">List of Events</h1>
      <Card withBorder shadow="lg">
        {events && <MantineReactTable table={table} />}
      </Card>
    </div>
  );
};

export default EventsListPage;
