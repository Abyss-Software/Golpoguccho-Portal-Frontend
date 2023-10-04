import { elegantGradients } from '@/constants/gradients';
import { Card } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function StatCard({ Icon, title, value }: StatCardProps) {
  const [gradientBackground, setGradientBackground] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * elegantGradients.length);
    setGradientBackground(elegantGradients[randomIndex]);
  }, []);

  return (
    <Card
      withBorder
      shadow="sm"
      radius="md"
      className="p-10"
      style={{ background: gradientBackground, color: 'white' }}
    >
      <Card.Section className="text-center" mt="sm">
        <h2 className="text-3xl">{value}</h2>
      </Card.Section>

      <Card.Section
        inheritPadding
        py="xs"
        className="flex items-center justify-center pt-5 gap-2"
      >
        <Icon />
        <div>{title}</div>
      </Card.Section>
    </Card>
  );
}

type StatCardProps = {
  Icon: any;
  title: string;
  value: number;
};
