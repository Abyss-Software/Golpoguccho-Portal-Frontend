import { Badge, Card, Group, Image, Text } from "@mantine/core";

import { IEventType } from "@/interfaces/packages.interface";

type EventTypesCardProps = {
  eventType: IEventType;
};

const EventTypesCard = ({ eventType }: EventTypesCardProps) => {
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Card.Section>
        <Image src={eventType.image} height={200} alt="Norway" />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} size={"lg"}>
          {eventType.title}
        </Text>
        <Badge color="green" variant="light">
          Active
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" lineClamp={3}>
        {eventType.description}
      </Text>
    </Card>
  );
};

export default EventTypesCard;
