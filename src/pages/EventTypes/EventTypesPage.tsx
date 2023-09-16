import { Button, Drawer, SimpleGrid, Text } from '@mantine/core';
import EventTypeCreateFrom, {
  EventTypeCreate,
} from '@/components/eventTypes/EventTypeCreateFrom';

import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import EventTypeDetails from '@/components/eventTypes/EventTypeDetails';
import EventTypesCard from '@/components/eventTypes/EventTypesCard';
import { IEventType } from '@/interfaces/packages.interface';
import { ThemeContext } from '@/contexts/ThemeContext';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import useEventTypeAction from '@/hooks/useEventTypeAction';
import { useState } from 'react';

const EventTypesPage = () => {
  const [openedDrawer, setDrawer] = useDisclosure(false);
  const { darkMode } = useContext(ThemeContext);

  const { fetchEventTypes } = useEventTypeAction();
  const { data: eventTypes } = fetchEventTypes();

  const [selectedEvent, setSelectedEvent] = useState<IEventType>();

  const {
    createEventTypeMutation,
    updateEventTypeMutation,
    deleteEventTypeMutation,
  } = useEventTypeAction();

  const onEventTypeCreate = (data: EventTypeCreate) => {
    createEventTypeMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
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
          withBorder: true,
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
            withBorder: true,
            id: 'eventTypeUpdate',
            color: 'green',
            title: 'Success',
            message: 'Event Type Updated',
            icon: <CheckIcon size="2rem" />,
          });
          modals.closeAll();
          setDrawer.close();
        },
        onError: (error: any) => {
          notifications.update({
            withBorder: true,
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

  const onEventTypeDelete = (id: string) => {
    deleteEventTypeMutation.mutate(id, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'eventTypeDelete',
          color: 'green',
          title: 'Success',
          message: 'Event Type Deleted',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
        setDrawer.close();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'eventTypeDelete',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const handleEventTypeClick = (eventType: IEventType) => {
    setSelectedEvent(eventType);
    setDrawer.open();
  };

  const handleEventTypeCreateClick = () => {
    modals.open({
      title: 'Create Event Type',
      centered: true,
      size: 'lg',
      children: <EventTypeCreateFrom onEventTypeCreate={onEventTypeCreate} />,
    });
  };

  const handleEventUpdateClick = (selectedEvent: IEventType) => {
    modals.open({
      title: 'Update Event Type',
      size: 'lg',
      centered: true,
      children: (
        <EventTypeCreateFrom
          onEventTypeUpdate={onEventTypeUpdate}
          defaultValues={selectedEvent}
          isUpdate
        />
      ),
    });
  };

  const handleEventDeleteClick = (selectedEvent: IEventType) =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this event type?</Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => onEventTypeDelete(selectedEvent.id!),
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
        zIndex={100}
      >
        {selectedEvent?.id && (
          <EventTypeDetails
            eventTypeId={selectedEvent.id}
            onEventUpdate={handleEventUpdateClick}
            onEventDelete={handleEventDeleteClick}
          />
        )}
      </Drawer>

      <h1 className="text-2xl font-bold">Event Types</h1>

      <Button
        size="md"
        uppercase
        variant={darkMode ? 'outline' : 'filled'}
        onClick={handleEventTypeCreateClick}
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
        {eventTypes?.map((eventType: any) => (
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
