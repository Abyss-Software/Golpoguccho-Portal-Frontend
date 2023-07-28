import {
  Avatar,
  Button,
  Card,
  FileButton,
  Group,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { useRef, useState } from "react";

import { EmployeeProfileValidationSchema } from "@/constants/validation/EmployeeProfileValidationSchema";
import { IEmployeeProfile } from "@/interfaces/profile.interface";
import UserIcon from "remixicon-react/User2FillIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ProfileForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployeeProfile>({
    resolver: zodResolver(EmployeeProfileValidationSchema),
    shouldUnregister: true,
  });

  const clearFile = () => {
    setImage(null);
    resetRef.current?.();
  };

  const onSubmit = (data: IEmployeeProfile) => {
    console.log(data);
  };

  const onProfileReset = () => {
    console.log("reset");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center p-4"
    >
      <Card radius="md" shadow="md" className="max-w-5xl w-full">
        <Card.Section
          py={"lg"}
          px={"xl"}
          className="flex flex-col items-center justify-center gap-4 w-full"
        >
          <Avatar
            src={image ? URL.createObjectURL(image) : null}
            alt="Vitaly Rtishchev"
            color="green"
            size={180}
            radius={300}
          >
            <UserIcon size={150} />
          </Avatar>

          <Group position="center">
            <FileButton
              resetRef={resetRef}
              onChange={setImage}
              accept="image/png, image/jpeg"
            >
              {(props) => (
                <Button {...props} w={150}>
                  Upload
                </Button>
              )}
            </FileButton>

            <Button w={150} disabled={!image} color="red" onClick={clearFile}>
              Reset
            </Button>
          </Group>

          {image && <p>Picked file: {image.name}</p>}
        </Card.Section>

        <Card.Section py={"lg"} px={"xl"}>
          <h2 className="text-2xl font-bold mb-4">Profile Information</h2>

          <SimpleGrid cols={2} spacing="lg">
            <TextInput
              {...register("fullname")}
              label="Full Name"
              size="md"
              placeholder="Your Full Name"
              error={errors?.fullname && errors?.fullname?.message}
            />

            <TextInput
              {...register("email")}
              type="email"
              label="Email"
              size="md"
              placeholder="Your Email Address"
              error={errors?.email && errors?.email?.message}
            />

            <TextInput
              {...register("contactPrimary")}
              label="Primary Contact Number"
              size="md"
              placeholder="Your Primary Contact Number"
              error={errors?.contactPrimary && errors?.contactPrimary?.message}
            />

            <TextInput
              {...register("contactSecondary")}
              label="Secondary Contact Number"
              size="md"
              placeholder="Your Secondary Contact Number"
              error={
                errors?.contactSecondary && errors?.contactSecondary?.message
              }
            />
          </SimpleGrid>

          <TextInput
            {...register("address")}
            mt={"lg"}
            label="Address"
            size="md"
            placeholder="Your Address"
            error={errors?.address && errors?.address?.message}
          />
        </Card.Section>

        <Card.Section py={"lg"} px={"xl"}>
          <SimpleGrid cols={2} spacing="lg">
            <div>
              <h1 className="font-semibold text-base">Role</h1>
              <h4 className="text-sm font-medium">Employee</h4>
            </div>

            <div>
              <h1 className="font-semibold text-base">Position</h1>
              <h4 className="text-sm font-medium">Cinematographer</h4>
            </div>

            <div>
              <h1 className="font-semibold text-base">Verification Type</h1>
              <h4 className="text-sm font-medium">NID</h4>
            </div>

            <div>
              <h1 className="font-semibold text-base">Verification ID</h1>
              <h4 className="text-sm font-medium">123345123</h4>
            </div>

            <div>
              <h1 className="font-semibold text-base">Base Salary</h1>
              <h4 className="text-sm font-medium">10,000$</h4>
            </div>

            <div>
              <h1 className="font-semibold text-base">Monthly Salary</h1>
              <h4 className="text-sm font-medium">5,000$</h4>
            </div>
          </SimpleGrid>
        </Card.Section>

        <Card.Section
          py={"lg"}
          px={"xl"}
          className="flex items-center justify-center gap-4"
        >
          <Button color="blue" type="submit" w={150}>
            Update Profile
          </Button>
          <Button color="red" type="button" w={150} onClick={onProfileReset}>
            Reset
          </Button>
        </Card.Section>
      </Card>
    </form>
  );
};

export default ProfileForm;
