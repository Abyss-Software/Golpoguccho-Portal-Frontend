import {
  Button,
  Card,
  SimpleGrid,
  Image,
  Group,
  Text,
  Badge,
  Drawer,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import React from 'react';
import { eventTypesData } from '@/constants/dummyData';
import EventTypeDetails from '@/components/eventTypes/EventTypeDetails';
import EventTypesCard from '@/components/eventTypes/EventTypesCard';

const EventTypesPage = () => {
  const handleEventTypeClick = (eventType: any) => {
    setSelectedEventType(eventType);
    console.log(eventType);
  };
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedEventType, setSelectedEventType] = React.useState<any>();

  return (
    <div>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        padding={'lg'}
        size={'xl'}
      >
        {selectedEventType && (
          <EventTypeDetails selectedEventType={selectedEventType} />
        )}
      </Drawer>

      <h1 className="text-2xl font-bold">Event Types</h1>
      <Button radius="sm" size="md" className="uppercase m-4" variant="outline">
        Add New Event Type
      </Button>

      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: '62rem', cols: 3, spacing: 'md' },
          { maxWidth: '48rem', cols: 2, spacing: 'sm' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
      >
        {eventTypesData.map((eventType) => (
          <div
            onClick={() => {
              handleEventTypeClick(eventType);
              open();
            }}
            className="cursor-pointer"
          >
            <EventTypesCard eventType={eventType} />
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default EventTypesPage;
