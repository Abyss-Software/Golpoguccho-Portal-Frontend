import {
  Avatar,
  Button,
  Card,
  FileButton,
  Group,
  SimpleGrid,
  TextInput,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';

import { EmployeeProfileValidationSchema } from '@/constants/validation/EmployeeProfileValidationSchema';
import { IEmployeeProfile } from '@/interfaces/profile.interface';
import UserIcon from 'remixicon-react/User2FillIcon';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toBase64 } from '@/utils/common.util';
import useEmployeeAction from '@/hooks/useEmployeeActions';
import { notifications } from '@mantine/notifications';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';

const ProfileForm = ({ employeeData }: { employeeData: any }) => {
  const [image, setImage] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const { updateProfileMutation } = useEmployeeAction();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IEmployeeProfile>({
    resolver: zodResolver(EmployeeProfileValidationSchema),
    shouldUnregister: true,
    defaultValues: {
      name: employeeData?.user?.name,
      email: employeeData?.user?.email,
      contactPrimary: employeeData?.contactPrimary,
      contactSecondary: employeeData?.contactSecondary,
      address: employeeData?.address,
    },
  });

  const clearFile = () => {
    setImage(null);
    resetRef.current?.();
  };

  const onSubmit = (data: IEmployeeProfile) => {
    console.log(data);
    data = { ...data, id: employeeData?.id };
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'updateProfile',
          color: 'green',
          title: 'Success',
          message: 'Profile Updated',
          icon: <CheckIcon size="2rem" />,
        });
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'updateProfile',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const onProfileReset = () => {
    reset();
  };

  useEffect(() => {
    if (image) {
      toBase64(image).then((res) => {
        setValue('avatar', res);
      });
    }
  }, [image]);

  console.log(errors, getValues());
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center p-4"
    >
      <Card radius="md" shadow="md" className="max-w-5xl w-full">
        <Card.Section
          py={'lg'}
          px={'xl'}
          className="flex flex-col items-center justify-center gap-4 w-full"
        >
          <Avatar
            src={
              image
                ? URL.createObjectURL(image)
                : employeeData?.avatar
                ? employeeData?.avatar
                : null
            }
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

        <Card.Section py={'lg'} px={'xl'}>
          <h2 className="text-2xl font-bold mb-4">Profile Information</h2>

          <SimpleGrid cols={2} spacing="lg">
            <TextInput
              {...register('name')}
              label="Full Name"
              size="md"
              placeholder="Your Full Name"
              defaultValue={employeeData?.user?.name}
              error={errors?.name && errors?.name?.message}
            />

            <TextInput
              {...register('email')}
              type="email"
              label="Email"
              size="md"
              placeholder="Your Email Address"
              defaultValue={employeeData?.user?.email}
              error={errors?.email && errors?.email?.message}
            />

            <TextInput
              {...register('contactPrimary')}
              label="Primary Contact Number"
              size="md"
              placeholder="Your Primary Contact Number"
              defaultValue={employeeData?.contactPrimary}
              error={errors?.contactPrimary && errors?.contactPrimary?.message}
            />

            <TextInput
              {...register('contactSecondary')}
              label="Secondary Contact Number"
              size="md"
              placeholder="Your Secondary Contact Number"
              defaultValue={employeeData?.contactSecondary}
              error={
                errors?.contactSecondary && errors?.contactSecondary?.message
              }
            />
          </SimpleGrid>

          <TextInput
            {...register('address')}
            mt={'lg'}
            label="Address"
            size="md"
            placeholder="Your Address"
            defaultValue={employeeData?.address}
            error={errors?.address && errors?.address?.message}
          />
        </Card.Section>

        <Card.Section py={'lg'} px={'xl'}>
          <SimpleGrid cols={2} spacing="lg">
            <div>
              <h1 className="font-semibold text-base">Role</h1>
              <h4 className="text-sm font-medium">
                {employeeData?.user?.role}
              </h4>
            </div>

            <div>
              <h1 className="font-semibold text-base">Position</h1>
              <h4 className="text-sm font-medium">{employeeData?.position}</h4>
            </div>

            <div>
              <h1 className="font-semibold text-base">Verification Type</h1>
              <h4 className="text-sm font-medium">
                {employeeData?.verificationType}
              </h4>
            </div>

            <div>
              <h1 className="font-semibold text-base">Verification ID</h1>
              <h4 className="text-sm font-medium">
                {employeeData?.verificationId}
              </h4>
            </div>

            <div>
              <h1 className="font-semibold text-base">Base Salary</h1>
              <h4 className="text-sm font-medium">
                {employeeData?.baseSalary}
              </h4>
            </div>

            <div>
              <h1 className="font-semibold text-base">Monthly Salary</h1>
              <h4 className="text-sm font-medium">
                {employeeData?.monthlySalary}
              </h4>
            </div>
          </SimpleGrid>
        </Card.Section>

        <Card.Section
          py={'lg'}
          px={'xl'}
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
