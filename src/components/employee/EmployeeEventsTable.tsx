import { IEmployeeEvent } from '@/interfaces/employeeEvents.interface';
import { Card } from '@mantine/core';
import CommonDataTable from '../dataTable/CommonDataTable';
import { employeeEventsColumns } from './EmployeeEventsColumns';
import { modals } from '@mantine/modals';
import EventDetails from './EmployeeEventDetails';

export default function EmployeeEventsTable({
  employeeEvents,
}: {
  employeeEvents: IEmployeeEvent[];
}) {
  const handleRowClick = (row: IEmployeeEvent) => {
    modals.open({
      title: 'Event Details',
      centered: true,
      size: 'lg',
      children: <EventDetails event={row.event} />,
    });
  };

  return (
    <div>
      <Card withBorder shadow="lg">
        {employeeEvents && (
          <CommonDataTable<IEmployeeEvent>
            data={employeeEvents}
            columns={employeeEventsColumns()}
            handleRowClick={handleRowClick}
          />
        )}
      </Card>
    </div>
  );
}
