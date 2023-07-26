import {
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  Image,
  SimpleGrid,
  rem,
} from "@mantine/core";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";

export default function StatCard() {
  return (
    <Card withBorder shadow="sm" radius="md" className="p-10 bg-white">
      <Card.Section className="text-center" mt="sm">
        <h2 className="text-3xl">50</h2>
      </Card.Section>

      <Card.Section inheritPadding py="xs">
        <div>caption</div>
        <div>icon</div>
      </Card.Section>
    </Card>
  );
}
