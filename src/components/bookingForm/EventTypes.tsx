import { Grid, Group, Input, Radio, SimpleGrid, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
type PackageType = {
  id: number;
  name: string;
  price: number;
  description: string;
};
type EventType = {
  id: number;
  name: string;
  packages: PackageType[];
};

const eventData: EventType[] = [
  {
    id: 1,
    name: 'Event Type 1',
    packages: [
      {
        id: 1,
        name: 'Package 1.1',
        price: 1000,
        description: 'This is package 1.1',
      },
      {
        id: 2,
        name: 'Package 1.2',
        price: 2000,
        description: 'This is package 1.2',
      },
      {
        id: 3,
        name: 'Package 1.3',
        price: 3000,
        description: 'This is package 1.3',
      },
    ],
  },
  {
    id: 2,
    name: 'Event Type 2',
    packages: [
      {
        id: 1,
        name: 'Package 2.1',
        price: 1000,
        description: 'This is package 2.1',
      },
      {
        id: 2,
        name: 'Package 2.2',
        price: 2000,
        description: 'This is package 2.2',
      },
      {
        id: 3,
        name: 'Package 2.3',
        price: 3000,
        description: 'This is package 2.3',
      },
    ],
  },
  // Add more event types and their packages as needed
];

const EventTypeSelection = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedEventType, setSelectedEventType] = useState<number | null>(
    null
  );
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const handleEventTypeSelection = (eventType: EventType) => {
    setSelectedEventType(eventType.id);
    setSelectedPackage(null);
    // Scroll to packages section when event type is selected
    document.getElementById('packagesSection')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className="pt-10 px-10">
      <h2 className="text-2xl font-bold"> Select Event Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {eventData.map((eventType) => (
          <div
            key={eventType.id}
            onClick={() => handleEventTypeSelection(eventType)}
            className={`p-4 border ${
              selectedEventType === eventType.id ? 'bg-blue-200' : 'bg-white'
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
            error={<>{errors?.eventTitle?.message}</>}
          >
            <Input
              radius="md"
              size="lg"
              type="text"
              placeholder="Event Title"
              {...register('eventTitle', { required: true })}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <Input.Wrapper
            id="eventDate"
            withAsterisk
            label="Event Date"
            error={<>{errors?.eventDate?.message}</>}
          >
            <Input
              radius="md"
              size="lg"
              type="date"
              placeholder="Event Date"
              {...register('eventDate', { required: true })}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <Input.Wrapper
            id="eventTime"
            withAsterisk
            label="Event Time"
            error={<>{errors?.eventTime?.message}</>}
          >
            <Input
              radius="md"
              size="lg"
              type="time"
              placeholder="Event Time"
              {...register('eventTime', { required: true })}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <Input.Wrapper
            id="eventEndTime"
            withAsterisk
            label="Event End Time"
            error={<>{errors?.eventEndTime?.message}</>}
          >
            <Input
              radius="md"
              size="lg"
              type="time"
              placeholder="Event End Time"
              {...register('eventEndTime', { required: true })}
            />
          </Input.Wrapper>
        </Grid.Col>

        <Grid.Col md={2} lg={1}>
          <Radio.Group
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
            error={<>{errors?.numberOfGuests?.message}</>}
          >
            <Input
              radius="md"
              size="lg"
              type="number"
              placeholder="Number of Guests"
              {...register('numberOfGuests', { required: true })}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <Input.Wrapper
            id="eventVenue"
            withAsterisk
            label="Event Venue"
            error={<>{errors?.eventVenue?.message}</>}
          >
            <Input
              radius="md"
              size="lg"
              type="text"
              placeholder="Event Venue"
              {...register('eventVenue', { required: true })}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col md={2} lg={1}>
          <Input.Wrapper
            id="eventVenueAddress"
            withAsterisk
            label="Event Venue Address"
            error={<>{errors?.eventVenueAddress?.message}</>}
          >
            <Textarea
              placeholder="Venue Address"
              radius="md"
              size="lg"
              withAsterisk
              {...register('eventVenueAddress', { required: true })}
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
            error={<>{errors?.additionalInfo?.message}</>}
          >
            <Textarea
              placeholder="Information about the event"
              radius="md"
              size="lg"
              withAsterisk
              {...register('additionalInfo', { required: false })}
              autosize
              minRows={2}
              maxRows={6}
            />
          </Input.Wrapper>
        </Grid.Col>
      </Grid>

      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default EventTypeSelection;
