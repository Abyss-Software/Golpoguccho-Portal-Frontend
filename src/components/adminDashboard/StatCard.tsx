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
        <h2 className="text-3xl">50</h2>
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

const elegantGradients = [
  'linear-gradient(45deg, #2c154e, #b7636f, #e39969)',
  'linear-gradient(45deg, #493b6d, #d28dba)',
  'linear-gradient(45deg, #df3556, #2e46b3)',
  'linear-gradient(45deg, #3d9f7b, #144a82)',
  'linear-gradient(45deg, #7d6bae, #d6a3d6)',
  'linear-gradient(45deg, #c87988, #ffb1c0)',
  'linear-gradient(45deg, #7420ac, #3300a2)',
  'linear-gradient(45deg, #8eafd1, #352975)',
  'linear-gradient(45deg, #49305c, #3e4b6a)',
  'linear-gradient(45deg, #817078, #d0d9d8)',
  'linear-gradient(45deg, #4571b8, #95b7d8)',
  'linear-gradient(45deg, #a0b6ff, #bcbcbc)',
  'linear-gradient(45deg, #dfb14b, #fa92b6)',
  'linear-gradient(45deg, #8c6dcf, #e0a5f0)',
  'linear-gradient(45deg, #b0e373, #82c487)',
  'linear-gradient(45deg, #ee85a0, #935889)',
  'linear-gradient(45deg, #77a7f2, #c394f2)',
  'linear-gradient(45deg, #76aad4, #c3aad4)',
  'linear-gradient(45deg, #da9de7, #6f1ab3)',
  'linear-gradient(45deg, #355c7d, #00b3a3)',
  'linear-gradient(45deg, #4a1a65, #346784)',
  'linear-gradient(45deg, #a1cfb9, #cadec5)',
  'linear-gradient(45deg, #d61e08, #e89413)',
  'linear-gradient(45deg, #db3354, #e2491d)',
  'linear-gradient(45deg, #69d37b, #008ca6)',
  'linear-gradient(45deg, #d64281, #db669e)',
  'linear-gradient(45deg, #1a0b36, #914c57, #cc8750)',
  'linear-gradient(45deg, #342b49, #b86f87)',
  'linear-gradient(45deg, #c6283a, #1e2e99)',
  'linear-gradient(45deg, #2c7e60, #0e3d68)',
  'linear-gradient(45deg, #5f558a, #b08eb0)',
  'linear-gradient(45deg, #9e596f, #e08999)',
  'linear-gradient(45deg, #671b8c, #290082)',
  'linear-gradient(45deg, #6a5d89, #281c42)',
  'linear-gradient(45deg, #382444, #2e3a4c)',
  'linear-gradient(45deg, #6c5a73, #c1cfd0)',
  'linear-gradient(45deg, #2c5a92, #759db9)',
  'linear-gradient(45deg, #8c9bff, #9a9a9a)',
  'linear-gradient(45deg, #c68c2d, #e686a9)',
  'linear-gradient(45deg, #704e99, #d4a1e4)',
  'linear-gradient(45deg, #8ea848, #67995a)',
  'linear-gradient(45deg, #d4657a, #71205a)',
  'linear-gradient(45deg, #6289bb, #a890bb)',
  'linear-gradient(45deg, #6b90c3, #c4b2c3)',
  'linear-gradient(45deg, #a269b8, #4d0f80)',
  'linear-gradient(45deg, #244152, #007f73)',
];
