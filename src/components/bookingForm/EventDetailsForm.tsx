import { ICreateBooking } from '@/interfaces/createBooking.interface';
import { Grid, Group, Input, Radio, SimpleGrid, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import { useForm, useFormContext, useFieldArray } from 'react-hook-form';
type PackageType = {
  id: string;
  name: string;
  price: number;
  description: string;
};
type EventType = {
  id: string;
  name: string;
  packages: PackageType[];
};

const eventData: EventType[] = [
  {
    id: '7f77bdd7-185d-49f9-9fa3-f78e8cfc5486',
    name: 'Event Type 1',
    packages: [
      {
        id: '62752196-dee4-4f6f-b741-68b4af7aa1cf',
        name: 'Package 1.1',
        price: 1000,
        description: 'This is package 1.1',
      },
      {
        id: '50bb27ca-9c52-4044-b892-1c8987af84f4',
        name: 'Package 1.2',
        price: 2000,
        description: 'This is package 1.2',
      },
      {
        id: 'ece7df97-a6b6-4200-a035-19c03b95ebe7',
        name: 'Package 1.3',
        price: 3000,
        description: 'This is package 1.3',
      },
    ],
  },
  {
    id: 'afefcfdb-ab38-465c-bff3-30f5b9c014ed',
    name: 'Event Type 2',
    packages: [
      {
        id: 'edab41f0-4064-4c70-b8e5-2a424f2d8a8b',
        name: 'Package 2.1',
        price: 1000,
        description: 'This is package 2.1',
      },
      {
        id: '1d4704b1-1c2f-4492-a495-974e28dd0cc5',
        name: 'Package 2.2',
        price: 2000,
        description: 'This is package 2.2',
      },
      {
        id: '33014292-be4d-4c0e-b9e3-fbe16f5c4e3d',
        name: 'Package 2.3',
        price: 3000,
        description: 'This is package 2.3',
      },
    ],
  },
];

const EventDetailsForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<ICreateBooking>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `events`,
  });

  const handleAddEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    append({
      eventTypeId: '',
      packageId: '',
      eventTitle: '',
      eventDate: '',
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

  console.log(getValues());

  const [selectedEventType, setSelectedEventType] = useState<string | null>(
    null
  );
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleEventTypeSelection = (eventType: EventType) => {
    setSelectedEventType(eventType.id);
    setSelectedPackage(null);
    // Scroll to packages section when event type is selected
    document.getElementById('packagesSection')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <>
      {fields.map((field, itemIndex) => {
        return (
          <div className="pt-10 px-10">
            <h2 className="text-2xl font-bold"> Select Event Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {eventData.map((eventType) => (
                <div
                  key={eventType.id}
                  onClick={() => handleEventTypeSelection(eventType)}
                  className={`p-4 border ${
                    selectedEventType === eventType.id
                      ? 'bg-blue-200'
                      : 'bg-white'
                  } cursor-pointer`}
                >
                  <h3 className="text-xl font-semibold">{eventType.name}</h3>
                </div>
              ))}
            </div>
            {selectedEventType && (
              <div id="packagesSection" className="mt-4">
                <h2 className="text-2xl font-semibold">Select Package</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {eventData
                    .find((eventType) => eventType.id === selectedEventType)
                    ?.packages.map((packageOption) => (
                      <div
                        key={packageOption.id}
                        onClick={() => setSelectedPackage(packageOption.id)}
                        className={`p-4 border ${
                          selectedPackage === packageOption.id
                            ? 'bg-blue-200'
                            : 'bg-white'
                        } cursor-pointer`}
                      >
                        <h3 className="text-xl font-semibold">
                          {packageOption.name}
                        </h3>
                        <p className="text-sm">{packageOption.description}</p>
                        <p className="text-sm font-semibold">
                          Price: ${packageOption.price}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <h2 className="text-2xl font-semibold mt-4">Event Information</h2>

            <Grid columns={2} className="p-10">
              {/* Event title, date of event, day event or evening event radio, outside dhaka radio, event start time picker, event end time picker, number of guests  */}
              <Grid.Col md={2} lg={1}>
                <Input.Wrapper
                  id="eventTitle"
                  withAsterisk
                  label="Event Title"
                  error={
                    <>{errors?.events?.[itemIndex]?.eventTitle?.message}</>
                  }
                >
                  <Input
                    radius="md"
                    size="lg"
                    type="text"
                    placeholder="Event Title"
                    {...register(`events.${itemIndex}.eventTitle`, {
                      required: true,
                    })}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col md={2} lg={1}>
                <Input.Wrapper
                  id="eventDate"
                  withAsterisk
                  label="Event Date"
                  error={<>{errors?.events?.[itemIndex]?.eventDate?.message}</>}
                >
                  <Input
                    radius="md"
                    size="lg"
                    type="date"
                    placeholder="Event Date"
                    {...register(`events.${itemIndex}.eventDate`, {
                      required: true,
                    })}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col md={2} lg={1}>
                <Input.Wrapper
                  id="eventTime"
                  withAsterisk
                  label="Event Time"
                  error={<>{errors?.events?.[itemIndex]?.eventTime?.message}</>}
                >
                  <Input
                    radius="md"
                    size="lg"
                    type="time"
                    placeholder="Event Time"
                    {...register(`events.${itemIndex}.eventTime`, {
                      required: true,
                    })}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col md={2} lg={1}>
                <Input.Wrapper
                  id="eventEndTime"
                  withAsterisk
                  label="Event End Time"
                  error={
                    <>{errors?.events?.[itemIndex]?.eventEndTime?.message}</>
                  }
                >
                  <Input
                    radius="md"
                    size="lg"
                    type="time"
                    placeholder="Event End Time"
                    {...register(`events.${itemIndex}.eventEndTime`, {
                      required: true,
                    })}
                  />
                </Input.Wrapper>
              </Grid.Col>

              <Grid.Col md={2} lg={1}>
                <Radio.Group
                  onChange={(value) => {
                    setValue(`events.${itemIndex}.dayOrEvening`, value);
                  }}
                  name="dayOrEvening"
                  label="When is the event?"
                  description="Select whether it is a day event or an evening event"
                  withAsterisk
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
                  name="dhakaOrOutside"
                  label="Where is the event?"
                  description="Select whether it is inside Dhaka or outside"
                  withAsterisk
                >
                  <Group mt="xs">
                    <Radio value="dhaka" label="Inside Dhaka" />
                    <Radio value="outside" label="Outside Dhaka" />
                  </Group>
                </Radio.Group>
              </Grid.Col>
              <Grid.Col md={2} lg={1}>
                <Input.Wrapper
                  id="numberOfGuests"
                  withAsterisk
                  label="Number of Guests"
                  error={
                    <>{errors?.events?.[itemIndex]?.numberOfGuests?.message}</>
                  }
                >
                  <Input
                    radius="md"
                    size="lg"
                    type="number"
                    placeholder="Number of Guests"
                    {...register(`events.${itemIndex}.numberOfGuests`, {
                      required: true,
                    })}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col md={2} lg={1}>
                <Input.Wrapper
                  id="eventVenue"
                  withAsterisk
                  label="Event Venue"
                  error={
                    <>{errors?.events?.[itemIndex]?.eventVenue?.message}</>
                  }
                >
                  <Input
                    radius="md"
                    size="lg"
                    type="text"
                    placeholder="Event Venue"
                    {...register(`events.${itemIndex}.eventVenue`, {
                      required: true,
                    })}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col md={2} lg={1}>
                <Input.Wrapper
                  id="eventVenueAddress"
                  withAsterisk
                  label="Event Venue Address"
                  error={
                    <>
                      {errors?.events?.[itemIndex]?.eventVenueAddress?.message}
                    </>
                  }
                >
                  <Textarea
                    placeholder="Venue Address"
                    radius="md"
                    size="lg"
                    withAsterisk
                    {...register(`events.${itemIndex}.eventVenueAddress`, {
                      required: true,
                    })}
                    autosize
                    minRows={2}
                    maxRows={6}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col md={2} lg={1}>
                <Input.Wrapper
                  id="additionalInfo"
                  label="Additional Information (Optional)"
                  error={
                    <>{errors?.events?.[itemIndex]?.additionalInfo?.message}</>
                  }
                >
                  <Textarea
                    placeholder="Information about the event"
                    radius="md"
                    size="lg"
                    withAsterisk
                    {...register(`events.${itemIndex}.additionalInfo`, {
                      required: false,
                    })}
                    autosize
                    minRows={2}
                    maxRows={6}
                  />
                </Input.Wrapper>
              </Grid.Col>
            </Grid>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              onClick={() => remove(itemIndex)}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button
        onClick={handleAddEvent}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Event
      </button>
    </>
  );
};

export default EventDetailsForm;
