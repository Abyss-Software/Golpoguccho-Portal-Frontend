import { Accordion, Button } from '@mantine/core';
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon';
import { useAuthStore } from '@/contexts/authContext';
import { modals } from '@mantine/modals';
import EmployeeAssignForm from './EmployeeAssignForm';

export default function EventDetails({
  event,
  index,
}: {
  event: any;
  index: number;
}) {
  const handleAssignEmployee = () => {
    modals.open({
      centered: true,
      size: 'lg',
      children: <EmployeeAssignForm eventId={event?.id} />,
    });
  };
  console.log(event);

  const { userInfo } = useAuthStore();

  return (
    <div key={index}>
      <Accordion.Item value={`${index}`}>
        <div key={index} className=" p-2 ">
          <Accordion.Control icon={<CalendarEventLineIcon color="#009247" />}>
            <h4 className="text-xl font-bold  ">
              <span className="text-primaryColor"> Event {index + 1}:</span>{' '}
              {event.title}
            </h4>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="space-y-1 px-2">
              <p>
                <span className="font-bold">Event Type:</span>{' '}
                {event.category.title}
              </p>
              <p>
                <span className="font-bold">Package ID:</span>{' '}
                {event.package.title}
              </p>

              <p>
                <span className="font-bold">Event Date:</span>{' '}
                {new Date(event.event_date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-bold">Event Time:</span>{' '}
                {event.start_time} - {event.end_time}
              </p>
              <p>
                <span className="font-bold">Day or Evening:</span>{' '}
                {event.day_or_evening}
              </p>
              <p>
                <span className="font-bold">Dhaka or Outside:</span>{' '}
                {event.dhaka_or_outside}
              </p>
              <p>
                <span className="font-bold">Number of Guests:</span>{' '}
                {event.number_of_guests}
              </p>
              <p>
                <span className="font-bold">Event Venue:</span> {event.venue}
              </p>
              <p>
                <span className="font-bold">Event Venue Address:</span>{' '}
                {event.location}
              </p>
              {event.additional_info && (
                <p>
                  <span className="font-bold">Additional Info:</span>{' '}
                  {event.additional_info}
                </p>
              )}
            </div>
            {(userInfo?.role == 'ADMIN' || userInfo?.role == 'MODERATOR') && (
              <Button
                className="mt-4"
                variant="filled"
                color="primary"
                size="md"
                onClick={handleAssignEmployee}
              >
                Employees Assigned
              </Button>
            )}
          </Accordion.Panel>
        </div>
      </Accordion.Item>
    </div>
  );
}
