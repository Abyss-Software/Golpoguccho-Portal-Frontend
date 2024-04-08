import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@mantine/core';
import useEventAction from '@/hooks/useEventAction';
import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
        accessorKey: 'status',
        header: 'Status',
        accessorFn: (row: any) =>
          new Date(row.event_date) < new Date() ? 'Completed' : 'Upcoming',
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

  const generateExcelFile = () => {
    const wb = XLSX.utils.book_new();
    const groupedData: { [key: string]: any[] } = {};

    // Modify the properties you want to include in the Excel sheet
    events.forEach((event: any) => {
      const monthYear = `${new Date(event.event_date).toLocaleString('en-us', {
        month: 'long',
      })} ${new Date(event.event_date).getFullYear()}`;
      if (!groupedData[monthYear]) {
        groupedData[monthYear] = [];
      }
      groupedData[monthYear].push({
        'Event Title': event.title,
        'Event Date': new Date(event.event_date).toLocaleDateString('en-GB'),
        'Start Time': event.start_time,
        Venue: event.venue,
        Location: event.location,
        'Number of Guests': event.number_of_guests,
        'Dhaka or Outside': event.dhaka_or_outside,
        'Package Title': event.package.title,
        'Full Name': event.booking.fullName,
        'Contact Primary': event.booking.contactPrimary,
        'Contact Secondary': event.booking.contactSecondary,
        'Additional Information': event.additional_info,
      });
    });

    // Sort sheets by date (latest first)
    const sortedSheets = Object.keys(groupedData).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime();
    });

    // Add sheets to workbook in sorted order
    sortedSheets.forEach((monthYear) => {
      const ws = XLSX.utils.json_to_sheet(groupedData[monthYear]);
      XLSX.utils.book_append_sheet(wb, ws, monthYear);
    });

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });
    saveAs(
      excelBlob,
      `Events List ${new Date().toLocaleDateString('en-GB')}.xlsx`
    );
  };

  return (
    <div>
      <div className="md:flex justify-between items-center">
        <h1 className="text-2xl p-4">List of Events</h1>
        <Button
          onClick={generateExcelFile}
          variant="filled"
          color="green"
          size="md"
          className="m-4"
        >
          Download Excel
        </Button>
      </div>
      <Card withBorder shadow="lg">
        {events && <MantineReactTable table={table} />}
      </Card>
    </div>
  );
};

export default EventsListPage;
