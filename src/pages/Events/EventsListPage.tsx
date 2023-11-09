import CommonDataTable from '@/components/dataTable/CommonDataTable';
import { IEvent } from '@/interfaces/event.interface';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mantine/core';
import useEventAction from '@/hooks/useEventAction';
import { eventColumns } from '@/components/events/eventColumns';
import { useEffect } from 'react';

const EventsListPage = () => {
  const navigate = useNavigate();
  const { fetchEvents } = useEventAction();
  const { data: events } = fetchEvents();
  const handleRowClick = (row: IEvent) => {
    navigate(`/admin/booking-details/${row.booking.id}`);
  };

  return (
    <div>
      <h1 className="text-2xl p-4">List of Events</h1>
      <Card withBorder shadow="lg">
        {events && (
          <CommonDataTable<IEvent>
            data={events}
            columns={eventColumns()}
            handleRowClick={handleRowClick}
            defaultSortField="createdAt"
          />
        )}
      </Card>
    </div>
  );
};

export default EventsListPage;
