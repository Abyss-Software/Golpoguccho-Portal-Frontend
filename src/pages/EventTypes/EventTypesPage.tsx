import { Button, Drawer, Modal, SimpleGrid } from '@mantine/core';

import EventTypeCreateFrom from '@/components/eventTypes/EventTypeCreateFrom';
import EventTypeDetails from '@/components/eventTypes/EventTypeDetails';
import EventTypesCard from '@/components/eventTypes/EventTypesCard';
import { IEventType } from '@/interfaces/packages.interface';
import PackageCreateFrom from '@/components/package/PackageCreateFrom';
import { eventTypesData } from '@/constants/dummyData';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import React, { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

const EventTypesPage = () => {
  const [openedDrawer, setDrawer] = useDisclosure(false);
  const [openedEventTypeModal, setEventTypeModal] = useDisclosure(false);
  const [openedPackageModal, setPackageModal] = useDisclosure(false);
  const { darkMode } = useContext(ThemeContext);

  const [selectedEvent, setSelectedEvent] = useState<IEventType>();

  const handleEventTypeClick = (eventType: IEventType) => {
    setSelectedEvent(eventType);
    setDrawer.open();
  };

  const handleAddNewEventType = () => {
    setEventTypeModal.open();
  };

  const handleCreatePackageClick = () => {
    setDrawer.close();
    setPackageModal.open();
  };

  return (
    <div className="space-y-4">
      <Drawer
        closeButtonProps={{
          size: 'lg',
        }}
        title={
          <p className="text-xl font-semibold">
            Event Type: {selectedEvent?.title}
          </p>
        }
        position="right"
        opened={openedDrawer}
        onClose={setDrawer.close}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        padding={'lg'}
        size={'xl'}
      >
        {selectedEvent && (
          <EventTypeDetails
            selectedEvent={selectedEvent}
            onCreatePackageClick={handleCreatePackageClick}
          />
        )}
      </Drawer>

      <Modal
        opened={openedEventTypeModal}
        onClose={setEventTypeModal.close}
        size="lg"
        closeButtonProps={{
          size: 'lg',
        }}
        title={<p className="text-lg font-semibold">Create New Event Type</p>}
      >
        <EventTypeCreateFrom />
      </Modal>

      <Modal
        opened={openedPackageModal}
        onClose={setPackageModal.close}
        size="lg"
        closeButtonProps={{
          size: 'lg',
        }}
        title={<p className="text-lg font-semibold">Create New Package</p>}
      >
        <PackageCreateFrom />
      </Modal>

      <h1 className="text-2xl font-bold">Event Types</h1>

      <Button
        size="md"
        uppercase
        variant={darkMode ? 'outline' : 'filled'}
        onClick={handleAddNewEventType}
      >
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
            key={eventType.id}
            onClick={() => handleEventTypeClick(eventType)}
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
