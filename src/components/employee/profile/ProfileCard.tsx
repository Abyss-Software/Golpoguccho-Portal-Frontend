import { Avatar, Card, SimpleGrid } from "@mantine/core";

import UserIcon from "remixicon-react/User2FillIcon";

const ProfileCard = () => {
  return (
    <Card
      radius="md"
      withBorder
      shadow="md"
      className="flex max-w-[1000px] mx-auto items-center"
    >
      <Avatar src={null} alt="Vitaly Rtishchev" color="green" size={150}>
        <UserIcon size={120} />
      </Avatar>

      <div className="space-y-5 p-5">
        <h1 className="text-2xl">Vitaly Rtishchev</h1>
        <SimpleGrid cols={2} spacing="lg" className="">
          <p className="text-lg">
            <strong>Role:</strong> Employee
          </p>
          <p className="text-lg">
            <strong>Position:</strong> Cinematographer
          </p>
          <p className="text-lg">
            <strong>Email:</strong> vitalychdi@gmail.com
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> +8801987654321
          </p>
        </SimpleGrid>
      </div>
    </Card>
  );
};

export default ProfileCard;
