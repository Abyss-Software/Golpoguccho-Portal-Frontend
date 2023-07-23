import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@mantine/core";
import EventInfoForm from "./EventInfoForm";
import EventTypeSelectForm from "./EventTypeSelectForm";
import { ICreateBooking } from "@/interfaces/createBooking.interface";

const EventDetailsForm = () => {
  const { control } = useFormContext<ICreateBooking>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `events`,
  });

  const handleAddEvent = () => {
    append({
      eventTypeId: "",
      packageId: "",
      eventTitle: "",
      eventDate: new Date(),
      eventTime: "",
      eventEndTime: "",
      dayOrEvening: "",
      dhakaOrOutside: "",
      numberOfGuests: 0,
      eventVenue: "",
      eventVenueAddress: "",
      additionalInfo: "",
    });
  };

  return (
    <div className="space-y-2">
      {fields.map((field, itemIndex) => (
        <div className="space-y-4" key={field.id}>
          <EventTypeSelectForm itemIndex={itemIndex} />

          <EventInfoForm itemIndex={itemIndex} />

          {fields.length > 1 && (
            <Button
              fullWidth
              type="button"
              color="red"
              onClick={() => remove(itemIndex)}
            >
              Delete
            </Button>
          )}
        </div>
      ))}

      <Button
        fullWidth
        size="md"
        color="green"
        type="button"
        variant="outline"
        onClick={handleAddEvent}
      >
        Add Event
      </Button>
    </div>
  );
};

export default EventDetailsForm;
