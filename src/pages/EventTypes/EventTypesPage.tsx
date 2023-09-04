import { Button, Drawer, Modal, SimpleGrid, Text } from '@mantine/core';
import EventTypeCreateFrom, {
  EventTypeCreate,
} from '@/components/eventTypes/EventTypeCreateFrom';
import EventTypeDetails from '@/components/eventTypes/EventTypeDetails';
import EventTypesCard from '@/components/eventTypes/EventTypesCard';
import { IEventType } from '@/interfaces/packages.interface';
import PackageCreateFrom from '@/components/package/PackageCreateFrom';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import useEventTypeAction from '@/hooks/useEventTypeAction';
import { notifications } from '@mantine/notifications';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import { modals } from '@mantine/modals';

const EventTypesPage = () => {
  const [openedDrawer, setDrawer] = useDisclosure(false);
  const { darkMode } = useContext(ThemeContext);

  const { fetchEventTypes } = useEventTypeAction();
  const { data: eventTypes } = fetchEventTypes();

  const [selectedEvent, setSelectedEvent] = useState<IEventType>();

  const handleEventTypeClick = (eventType: IEventType) => {
    setSelectedEvent(eventType);
    setDrawer.open();
  };

  const handleAddNewEventType = () => {
    modals.open({
      title: 'Create Event Type',
      children: <EventTypeCreateFrom onEventTypeCreate={onEventTypeCreate} />,
    });
  };

  const handleCreatePackageClick = () => {
    setDrawer.close();
  };

  const { createEventTypeMutation, updateEventTypeMutation } =
    useEventTypeAction();

  const onEventTypeCreate = (data: EventTypeCreate) => {
    createEventTypeMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          id: 'eventTypeCreation',
          color: 'green',
          title: 'Success',
          message: 'Event Type Created',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          id: 'eventTypeCreation',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const onEventTypeUpdate = (data: EventTypeCreate) => {
    updateEventTypeMutation.mutate(
      { ...data, id: data.id! },
      {
        onSuccess: () => {
          notifications.update({
            id: 'eventTypeUpdate',
            color: 'green',
            title: 'Success',
            message: 'Event Type Updated',
            icon: <CheckIcon size="2rem" />,
          });
          modals.closeAll();
        },
        onError: (error: any) => {
          notifications.update({
            id: 'eventTypeUpdate',
            color: 'red',
            title: 'Failed',
            message: error?.response?.data?.message || 'Something went wrong',
            icon: <ErrorIcon size="2rem" />,
          });
        },
      }
    );
  };

  const onEventTypeUpdateClick = (selectedEvent: IEventType) => {
    modals.open({
      title: 'Update Event Type',
      children: (
        <EventTypeCreateFrom
          onEventTypeUpdate={onEventTypeUpdate}
          defaultValues={selectedEvent}
          isUpdate
        />
      ),
    });
  };

  const onDelete = () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">Are you sure you want to delete this event type?</Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

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
            onEditClick={onEventTypeUpdateClick}
            onDeleteClick={onDelete}
          />
        )}
      </Drawer>

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
        {eventTypes?.body.map((eventType: any) => (
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
