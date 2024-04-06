import { IEmployeeEvent } from '@/interfaces/employeeEvents.interface';
import { Card } from '@mantine/core';
import CommonDataTable from '../dataTable/CommonDataTable';
import { employeeEventsColumns } from './EmployeeEventsColumns';
import { modals } from '@mantine/modals';
import EventDetails from './EmployeeEventDetails';
import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

export default function EmployeeEventsTable({
  employeeEvents,
}: {
  employeeEvents: IEmployeeEvent[];
}) {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'eventId',
        header: 'Event ID',
        hidden: true,
      },
      {
        accessorKey: 'event.event_date',
        accessorFn: (row: any) =>
          new Date(row.event.event_date).toLocaleDateString('en-GB'),
        header: 'Event Date',
        cell: (info: any) => info.getValue().toLocaleDateString('en-GB'),
        sortingFn: (rowA: any, rowB: any) => {
          // Compare timestamps directly
          let dateA = rowA.original.event.event_date
            ? new Date(rowA.original.event.event_date).getTime()
            : 0;
          let dateB = rowB.original.event.event_date
            ? new Date(rowB.original.event.event_date).getTime()
            : 0;
          return dateA > dateB ? 1 : -1;
        },
      },
      {
        accessorKey: 'event.title',
        header: 'Event Title',
      },

      {
        accessorKey: 'event.venue',
        header: 'Venue',
        size: 300,
        // Cell: ({ row }: any) => (
        //   <div className="text-wrap">
        //     {row.original.event.venue.slice(0, 30)}
        //   </div>
        // ),
      },
      {
        accessorKey: 'event.dhaka_or_outside',
        header: 'Location',
      },
      {
        accessorKey: 'payment',
        header: 'Payment',
      },
    ],
    []
  );
  const handleRowClick = (row: IEmployeeEvent) => {
    modals.open({
      title: 'Event Details',
      centered: true,
      size: 'lg',
      children: <EventDetails event={row.event} />,
    });
  };

  const table = useMantineReactTable({
    columns,
    data: employeeEvents ? employeeEvents : [],
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
        eventId: false,
      },
      sorting: [
        {
          id: 'event.event_date',
          desc: true,
        },
      ],
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        handleRowClick(row.original);
      },
      sx: {
        cursor: 'pointer',
        fontWeight: 'normal',
      },
    }),
  });

  return (
    <div>
      <Card withBorder shadow="lg">
        {employeeEvents && (
          // (
          // <CommonDataTable<IEmployeeEvent>
          //   data={employeeEvents}
          //   columns={employeeEventsColumns()}
          //   handleRowClick={handleRowClick}
          // />
          // )
          <MantineReactTable table={table} />
        )}
      </Card>
    </div>
  );
}
