import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@mantine/core';
import EventInfoForm from './EventInfoForm';
import EventTypeSelectForm from './EventTypeSelectForm';
import { ICreateBooking } from '@/interfaces/createBooking.interface';

const EventDetailsForm = () => {
  const { control } = useFormContext<ICreateBooking>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `events`,
  });

  const handleAddEvent = () => {
    append({
      eventTypeId: '',
      packageId: '',
      eventTitle: '',
      eventDate: new Date(),
      eventTime: '',
      eventEndTime: '',
      dayOrEvening: '',
      dhakaOrOutside: '',
      numberOfGuests: 0,
      eventVenue: '',
      eventVenueAddress: '',
      additionalInfo: '',
    });
  };

  return (
    <div className="space-y-2">
      {fields.map((field, itemIndex) => (
        <div className="space-y-2 lg:space-y-4  lg:pt-10" key={field.id}>
          <h1>Event {itemIndex + 1}</h1>
          <EventTypeSelectForm itemIndex={itemIndex} />

          <EventInfoForm itemIndex={itemIndex} />

          {fields.length > 1 && (
            <Button
              fullWidth
              size="md"
              type="button"
              color="red"
              variant="outline"
              onClick={() => remove(itemIndex)}
            >
              Remove This Event
            </Button>
          )}
        </div>
      ))}

      <Button
        fullWidth
        size="md"
        type="button"
        variant="outline"
        onClick={handleAddEvent}
      >
        Add Another Event
      </Button>
    </div>
  );
};

export default EventDetailsForm;
