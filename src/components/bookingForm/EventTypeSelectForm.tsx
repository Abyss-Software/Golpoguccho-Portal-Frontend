import { useEffect, useRef } from 'react';

import EventTypeCard from './EventTypeCard';
import { Grid, Loader } from '@mantine/core';
import { ICreateBooking } from '@/interfaces/createBooking.interface';
import { IEventType, IPackage } from '@/interfaces/packages.interface';
import PackageCard from './PackageCard';
import useEventTypeAction from '@/hooks/useEventTypeAction';
import { useFormContext } from 'react-hook-form';
import { notifications } from '@mantine/notifications';

type EventTypeSelectFormProps = {
  itemIndex: number;
};

function EventTypeSelectForm({ itemIndex }: EventTypeSelectFormProps) {
  const eventTypeRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);

  const { fetchEventTypes } = useEventTypeAction();

  const { data: eventTypesData = [], isLoading } = fetchEventTypes();

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ICreateBooking>();

  const handleEventTypeSelection = (eventType: IEventType) => {
    setValue(`events.${itemIndex}.eventTypeId`, eventType.id!, {
      shouldValidate: true,
    });
    setValue(`events.${itemIndex}.packageId`, '');
  };

  const handlePackageSelection = (packageOption: IPackage) => {
    setValue(`events.${itemIndex}.packageId`, packageOption.id!, {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    eventTypeRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
  }, []);

  useEffect(() => {
    if (watch(`events.${itemIndex}.eventTypeId`)) {
      packageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [itemIndex, watch(`events.${itemIndex}.eventTypeId`)]);

  useEffect(() => {
    if (errors?.events?.[itemIndex]?.eventTypeId) {
      notifications.show({
        title: 'Event Type is required',
        message: 'Please select an event type on event ' + (itemIndex + 1),
        color: 'red',
      });
    }

    if (errors?.events?.[itemIndex]?.packageId) {
      notifications.show({
        title: 'Package is required',
        message: 'Please select a package on event ' + (itemIndex + 1),
        color: 'red',
      });
    }
  }, [errors?.events]);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Select Event Type</h3>
        {isLoading && <Loader className="mx-auto" size="xl" />}
        <Grid columns={3} ref={eventTypeRef}>
          {eventTypesData.map((eventType) => (
            <Grid.Col key={eventType.id} xs={3} sm={1.5} md={1}>
              <EventTypeCard
                eventType={eventType}
                selected={
                  watch(`events.${itemIndex}.eventTypeId`) === eventType.id
                }
                onClick={() => handleEventTypeSelection(eventType)}
                error={!!errors?.events?.[itemIndex]?.eventTypeId}
              />
            </Grid.Col>
          ))}
        </Grid>
      </div>

      {watch(`events.${itemIndex}.eventTypeId`) && (
        <div className="space-y-1" ref={packageRef}>
          <h2 className="text-xl font-bold">Select Package</h2>
          <Grid columns={3}>
            {eventTypesData
              .find(
                (eventType) =>
                  eventType.id === watch(`events.${itemIndex}.eventTypeId`)
              )
              ?.packages.map((packageOption) => (
                <Grid.Col key={packageOption.id} xs={3} sm={1.5} md={1}>
                  <PackageCard
                    packageOption={packageOption}
                    selected={
                      watch(`events.${itemIndex}.packageId`) ===
                      packageOption.id
                    }
                    onClick={() => handlePackageSelection(packageOption)}
                    error={!!errors?.events?.[itemIndex]?.packageId}
                  />
                </Grid.Col>
              ))}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default EventTypeSelectForm;
