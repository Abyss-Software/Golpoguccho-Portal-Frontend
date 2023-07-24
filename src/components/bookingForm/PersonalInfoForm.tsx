import { Grid, Input } from "@mantine/core";

import { ICreateBooking } from "@/interfaces/createBooking.interface";
import { useFormContext } from "react-hook-form";

const PersonalInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ICreateBooking>();

  return (
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
          {...register("bookingTitle", { required: true })}
        />
      </Input.Wrapper>
      <Grid columns={2} gutter={"xl"}>
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
              {...register("fullName", { required: true })}
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
              {...register("email", { required: true })}
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
              {...register("contactPrimary", { required: true })}
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
              {...register("contactSecondary", { required: true })}
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
              {...register("address", { required: true })}
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
              {...register("city", { required: true })}
            />
          </Input.Wrapper>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default PersonalInfoForm;
