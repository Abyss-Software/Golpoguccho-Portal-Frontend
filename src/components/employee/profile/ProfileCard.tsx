import { Avatar, Card, SimpleGrid } from '@mantine/core';

import UserIcon from 'remixicon-react/User2FillIcon';

const ProfileCard = ({ employeeData }: { employeeData: any }) => {
  return (
    <Card
      radius="md"
      withBorder
      shadow="md"
      className="flex flex-col md:flex-row mt-4 max-w-[1000px] mx-auto items-center"
    >
      <Avatar
        src={employeeData?.avatar ?? null}
        alt="Employee Image"
        color="green"
        size={150}
      >
        <UserIcon size={120} />
      </Avatar>

      <div className="space-y-5 p-5">
        <h1 className="text-2xl">{employeeData?.user?.name}</h1>
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: 'sm', cols: 1 },
            { maxWidth: 'md', cols: 2 },
          ]}
        >
          <p className="text-lg">
            <strong>Role:</strong> {employeeData?.user?.role}
          </p>
          <p className="text-lg">
            <strong>Position:</strong> {employeeData?.position}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {employeeData?.user?.email}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {employeeData?.contactPrimary}
          </p>
        </SimpleGrid>
      </div>
    </Card>
  );
};

export default ProfileCard;
