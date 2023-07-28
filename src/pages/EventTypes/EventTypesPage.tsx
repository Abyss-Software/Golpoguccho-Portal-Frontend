import { Button, Drawer, SimpleGrid } from "@mantine/core";

import EventTypeDetails from "@/components/eventTypes/EventTypeDetails";
import EventTypesCard from "@/components/eventTypes/EventTypesCard";
import { IEventType } from "@/interfaces/packages.interface";
import { eventTypesData } from "@/constants/dummyData";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const EventTypesPage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedEvent, setSelectedEvent] = useState<IEventType>();

  const handleEventTypeClick = (eventType: IEventType) => {
    setSelectedEvent(eventType);
    console.log(eventType);
  };

  return (
    <div className="space-y-4">
      <Drawer
        closeButtonProps={{
          size: "lg",
        }}
        title={
          <h1 className="font-semibold">Event Type: {selectedEvent?.title}</h1>
        }
        position="right"
        opened={opened}
        onClose={close}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        padding={"lg"}
        size={"xl"}
      >
        {selectedEvent && <EventTypeDetails selectedEvent={selectedEvent} />}
      </Drawer>

      <h1 className="text-2xl font-bold">Event Types</h1>

      <Button radius="sm" size="md" className="uppercase" variant="outline">
        Add New Event Type
      </Button>

      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
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
