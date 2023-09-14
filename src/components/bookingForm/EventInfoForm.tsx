import {
  Grid,
  Group,
  NumberInput,
  Radio,
  TextInput,
  Textarea,
} from "@mantine/core";

import { DateInput } from "@mantine/dates";
import { ICreateBooking } from "@/interfaces/createBooking.interface";
import { useFormContext } from "react-hook-form";

type EventInfoFormProps = {
  itemIndex: number;
};

function EventInfoForm({ itemIndex }: EventInfoFormProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ICreateBooking>();

  return (
    <div className="space-y-1">
      <h3 className="text-2xl font-semibold">Event Information</h3>
      <Grid columns={2} gutter={"xl"}>
        <Grid.Col md={2} lg={1}>
          <TextInput
            {...register(`events.${itemIndex}.eventTitle`)}
            withAsterisk
            size="lg"
            label="Event Title"
            placeholder="Event Title"
            error={errors?.events?.[itemIndex]?.eventTitle?.message}
          />
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <DateInput
            {...register(`events.${itemIndex}.eventDate`)}
            withAsterisk
            clearable
            size="lg"
            label="Event Date"
            minDate={new Date()}
            placeholder="Event Date"
            onChange={(value) => {
              setValue(
                `events.${itemIndex}.eventDate`,
                new Date(value?.toISOString() ?? "")
              );
            }}
            error={errors?.events?.[itemIndex]?.eventDate?.message}
          />
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <TextInput
            {...register(`events.${itemIndex}.eventTime`)}
            withAsterisk
            label="Event Time"
            size="lg"
            type="time"
            placeholder="Event Time"
            error={errors?.events?.[itemIndex]?.eventTime?.message}
          />
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <TextInput
            {...register(`events.${itemIndex}.eventEndTime`)}
            withAsterisk
            label="Event End Time"
            size="lg"
            type="time"
            placeholder="Event End Time"
            error={errors?.events?.[itemIndex]?.eventEndTime?.message}
          />
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <Radio.Group
            onChange={(value) => {
              setValue(`events.${itemIndex}.dayOrEvening`, value);
            }}
            name={`dayOrEvening${itemIndex}`}
            label="When is the event?"
            description="Select whether it is a day event or an evening event"
            withAsterisk
            error={errors?.events?.[itemIndex]?.dayOrEvening?.message}
          >
            <Group mt="xs">
              <Radio value="day" label="Day Event" />
              <Radio value="evening" label="Evening Event" />
            </Group>
          </Radio.Group>
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <Radio.Group
            onChange={(value) => {
              setValue(`events.${itemIndex}.dhakaOrOutside`, value);
            }}
            name={`dhakaOrOutside${itemIndex}`}
            label="Where is the event?"
            description="Select whether it is inside Dhaka or outside"
            withAsterisk
            error={errors?.events?.[itemIndex]?.dhakaOrOutside?.message}
          >
            <Group mt="xs">
              <Radio value="dhaka" label="Inside Dhaka" />
              <Radio value="outside" label="Outside Dhaka" />
            </Group>
          </Radio.Group>
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <NumberInput
            {...register(`events.${itemIndex}.numberOfGuests`, {
              valueAsNumber: true,
            })}
            withAsterisk
            size="lg"
            min={0}
            max={1000}
            label="Number of Guests"
            placeholder="Number of Guests"
            onChange={(value) => {
              setValue(`events.${itemIndex}.numberOfGuests`, value || 0);
            }}
            error={errors?.events?.[itemIndex]?.numberOfGuests?.message}
          />
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <TextInput
            {...register(`events.${itemIndex}.eventVenue`)}
            withAsterisk
            label="Event Venue"
            size="lg"
            type="text"
            placeholder="Event Venue"
            error={errors?.events?.[itemIndex]?.eventVenue?.message}
          />
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <Textarea
            {...register(`events.${itemIndex}.eventVenueAddress`)}
            withAsterisk
            label="Event Venue Address"
            size="lg"
            placeholder="Venue Address"
            autosize
            minRows={2}
            maxRows={6}
            error={errors?.events?.[itemIndex]?.eventVenueAddress?.message}
          />
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <Textarea
            {...register(`events.${itemIndex}.additionalInfo`)}
            label="Additional Information (Optional)"
            size="lg"
            placeholder="Information about the event"
            autosize
            minRows={2}
            maxRows={6}
            error={errors?.events?.[itemIndex]?.additionalInfo?.message}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default EventInfoForm;
