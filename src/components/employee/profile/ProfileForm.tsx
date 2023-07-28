import { ICreateBooking } from '@/interfaces/createBooking.interface';
import {
  Avatar,
  Button,
  Card,
  FileButton,
  Grid,
  Group,
  Input,
} from '@mantine/core';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBookingValidationSchema } from '@/constants/validation/CreateBookingValidationSchema';

const ProfileForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const methods = useForm<ICreateBooking>({
    resolver: zodResolver(CreateBookingValidationSchema),
    shouldUnregister: true,
    defaultValues: {
      events: [
        {
          eventTypeId: '',
          packageId: '',
          eventTitle: '',
          eventDate: new Date(),
          eventTime: '',
          eventEndTime: '',
          dayOrEvening: '',
          dhakaOrOutside: '',
          numberOfGuests: 0,
          eventVenue: '',
          eventVenueAddress: '',
          additionalInfo: '',
        },
      ],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: ICreateBooking) => {
    console.log(data);
  };

  return (
    <Card
      radius="md"
      shadow="md"
      withBorder
      padding={20}
      className=" flex flex-col items-center justify-center pt-10"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Avatar
          src={file ? URL.createObjectURL(file) : null}
          alt="Vitaly Rtishchev"
          color="green"
          className="h-48 w-48 rounded-full"
        />

        <Group position="center">
          <FileButton
            resetRef={resetRef}
            onChange={setFile}
            accept="image/png,image/jpeg"
          >
            {(props) => <Button {...props}>Upload</Button>}
          </FileButton>
          <Button disabled={!file} color="red" onClick={clearFile}>
            Reset
          </Button>
        </Group>

        {file && <p>Picked file: {file.name}</p>}
      </div>

      <div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Booking Information</h2>
          <Input.Wrapper
            id="bookingTitle"
            withAsterisk
            label="Title of Booking"
            description="Give a simple title for referencing. Example: 'Taha and Rivu's Wedding events', 'Golpoguccho Annual Company Event' etc."
            error={<>{errors?.bookingTitle?.message}</>}
          >
            <Input
              size="lg"
              type="text"
              placeholder="Booking Title"
              {...register('bookingTitle', { required: true })}
            />
          </Input.Wrapper>
          <Grid columns={2} gutter={'xl'}>
            <Grid.Col md={2} lg={1}>
              <Input.Wrapper
                id="fullname"
                withAsterisk
                label="Full Name"
                error={<>{errors?.fullName?.message}</>}
              >
                <Input
                  size="lg"
                  type="text"
                  placeholder="First Name"
                  {...register('fullName', { required: true })}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col md={2} lg={1}>
              <Input.Wrapper
                id="email"
                withAsterisk
                label="Email Address"
                error={<>{errors?.email?.message}</>}
              >
                <Input
                  size="lg"
                  type="email"
                  placeholder="Email"
                  {...register('email', { required: true })}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col md={2} lg={1}>
              <Input.Wrapper
                id="primary Contact Number"
                withAsterisk
                label="Primary Contact Number"
                error={<>{errors?.contactPrimary?.message}</>}
              >
                <Input
                  size="lg"
                  type="text"
                  placeholder="Contact Number Primary"
                  {...register('contactPrimary', { required: true })}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col md={2} lg={1}>
              <Input.Wrapper
                id="secondary Contact Number"
                label="Secondary Contact Number"
                error={<>{errors?.contactSecondary?.message}</>}
              >
                <Input
                  size="lg"
                  type="text"
                  placeholder="Contact Number Secondary"
                  {...register('contactSecondary', { required: true })}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col md={2} lg={1}>
              <Input.Wrapper
                withAsterisk
                id="address"
                label="Address"
                error={<>{errors?.address?.message}</>}
              >
                <Input
                  size="lg"
                  type="text"
                  placeholder="Address"
                  {...register('address', { required: true })}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col md={2} lg={1}>
              <Input.Wrapper
                withAsterisk
                id="city"
                label="City"
                error={<>{errors?.city?.message}</>}
              >
                <Input
                  size="lg"
                  type="text"
                  placeholder="City"
                  {...register('city', { required: true })}
                />
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-10">
        <Button color="blue">Update Profile</Button>
        <Button color="red">Reset</Button>
      </div>
    </Card>
  );
};

export default ProfileForm;
