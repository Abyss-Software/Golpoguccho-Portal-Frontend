import { useEffect, useRef, useState } from 'react';

import EventTypeCard from './EventTypeCard';
import { Grid } from '@mantine/core';
import { ICreateBooking } from '@/interfaces/createBooking.interface';
import PackageCard from './PackageCard';
import { useFormContext } from 'react-hook-form';

export type EventType = {
  id: string;
  name: string;
  image: string;
  packages: PackageType[];
};

export type PackageType = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

const eventData: EventType[] = [
  {
    id: '7f77bdd7-185d-49f9-9fa3-f78e8cfc5486',
    name: 'Event Type 1',
    image:
      'https://tradebrains.in/wp-content/uploads/2020/02/Wedding-cost-in-India-Explained-Cover-Image.jpg',
    packages: [
      {
        id: '62752196-dee4-4f6f-b741-68b4af7aa1cf',
        name: 'Package 1.1',
        price: 1000,
        description: 'This is package 1.1',
        image:
          'https://tradebrains.in/wp-content/uploads/2020/02/Wedding-cost-in-India-Explained-Cover-Image.jpg',
      },
      {
        id: '50bb27ca-9c52-4044-b892-1c8987af84f4',
        name: 'Package 1.2',
        price: 2000,
        description: 'This is package 1.2',
        image:
          'https://tradebrains.in/wp-content/uploads/2020/02/Wedding-cost-in-India-Explained-Cover-Image.jpg',
      },
      {
        id: 'ece7df97-a6b6-4200-a035-19c03b95ebe7',
        name: 'Package 1.3',
        price: 3000,
        description: 'This is package 1.3',
        image:
          'https://tradebrains.in/wp-content/uploads/2020/02/Wedding-cost-in-India-Explained-Cover-Image.jpg',
      },
    ],
  },
  {
    id: 'afefcfdb-ab38-465c-bff3-30f5b9c014ed',
    name: 'Event Type 2',
    image:
      'https://tradebrains.in/wp-content/uploads/2020/02/Wedding-cost-in-India-Explained-Cover-Image.jpg',
    packages: [
      {
        id: 'edab41f0-4064-4c70-b8e5-2a424f2d8a8b',
        name: 'Package 2.1',
        price: 1000,
        description: 'This is package 2.1',
        image:
          'https://tradebrains.in/wp-content/uploads/2020/02/Wedding-cost-in-India-Explained-Cover-Image.jpg',
      },
      {
        id: '1d4704b1-1c2f-4492-a495-974e28dd0cc5',
        name: 'Package 2.2',
        price: 2000,
        description: 'This is package 2.2',
        image:
          'https://tradebrains.in/wp-content/uploads/2020/02/Wedding-cost-in-India-Explained-Cover-Image.jpg',
      },
      {
        id: '33014292-be4d-4c0e-b9e3-fbe16f5c4e3d',
        name: 'Package 2.3',
        price: 3000,
        description: 'This is package 2.3',
        image:
          'https://tradebrains.in/wp-content/uploads/2020/02/Wedding-cost-in-India-Explained-Cover-Image.jpg',
      },
    ],
  },
];

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

  const handleEventTypeSelection = (eventType: EventType) => {
    setValue(`events.${itemIndex}.eventTypeId`, eventType.id);
    setValue(`events.${itemIndex}.packageId`, '');
  };

  useEffect(() => {
    eventTypeRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
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
          {eventData.map((eventType) => (
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
            {eventData
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
                        packageOption.id
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
