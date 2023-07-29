import { useEffect, useRef } from 'react';

import EventTypeCard from './EventTypeCard';
import { Grid } from '@mantine/core';
import { ICreateBooking } from '@/interfaces/createBooking.interface';
import { IEventType } from '@/interfaces/packages.interface';
import PackageCard from './PackageCard';
import { eventTypesData } from '@/constants/dummyData';
import { useFormContext } from 'react-hook-form';

type EventTypeSelectFormProps = {
  itemIndex: number;
};

function EventTypeSelectForm({ itemIndex }: EventTypeSelectFormProps) {
  const eventTypeRef = useRef<HTMLDivElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ICreateBooking>();

  const handleEventTypeSelection = (eventType: IEventType) => {
    setValue(`events.${itemIndex}.eventTypeId`, eventType.id!);
    setValue(`events.${itemIndex}.packageId`, '');
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

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold">Select Event Type</h3>
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
          <h2 className="text-2xl font-bold">Select Package</h2>
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
                    onClick={() =>
                      setValue(
                        `events.${itemIndex}.packageId`,
                        packageOption.id!
                      )
                    }
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
