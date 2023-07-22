import { ICreateBooking } from '@/interfaces/createBooking.interface';
import { Grid, Input, SimpleGrid } from '@mantine/core';
import React from 'react';
import { useForm, useFormContext } from 'react-hook-form';

const PersonalInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<ICreateBooking>();

  return (
    <div className="pt-10 px-10">
      <h2 className="text-2xl font-bold"> Booking Information</h2>
      <Grid columns={2} className="p-10">
        <Grid.Col md={2} lg={1}>
          <Input.Wrapper
            id="fullname"
            withAsterisk
            label="Full Name"
            error={<>{errors?.fullName?.message}</>}
          >
            <Input
              radius="md"
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
              radius="md"
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
              radius="md"
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
              radius="md"
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
              radius="md"
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
              radius="md"
              size="lg"
              type="text"
              placeholder="City"
              {...register('city', { required: true })}
            />
          </Input.Wrapper>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default PersonalInfo;
