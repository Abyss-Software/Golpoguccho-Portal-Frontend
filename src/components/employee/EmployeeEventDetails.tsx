import React from 'react';
import {
  Event,
  IEmployeeEvent,
  Employee,
} from '@/interfaces/employeeEvents.interface';

interface EventDetailsProps {
  event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Event: {event.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="mb-2">
            <strong>Event Date:</strong>{' '}
            {new Date(event.event_date).toDateString()}
          </p>
          <p className="mb-2">
            <strong>Venue:</strong> {event.venue}
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="mb-2">
            <strong>Guest Count:</strong> {event.number_of_guests}
          </p>
        </div>
        <div>
          <p className="mb-2">
            <strong>Event Type:</strong> {event.category.title}
          </p>

          <p className="mb-2">
            <strong>Start Time:</strong> {event.start_time}
          </p>
          <p className="mb-2">
            <strong>End Time:</strong> {event.end_time}
          </p>
        </div>
      </div>
      <hr className="mb-4" />
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Assigned Employees</h3>
        <ul>
          {event.assignedEmployees.map((employeeEvent: IEmployeeEvent) => (
            <li key={employeeEvent.employeeId} className="mb-2">
              <strong>Position:</strong> {employeeEvent.position}
              <br />
              {employeeEvent.employee && (
                <>
                  <strong>Employee Name:</strong>{' '}
                  {employeeEvent.employee.user.name}
                  <br />
                  <strong>Contact:</strong>{' '}
                  {employeeEvent.employee.contactPrimary}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventDetails;
