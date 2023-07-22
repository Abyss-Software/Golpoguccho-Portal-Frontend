import { Input } from '@mantine/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import PersonalInfo from './PersonalInfo';
import EventTypeSelection from './EventDetailsForm';
import EventDetailsForm from './EventDetailsForm';
import { ICreateBooking } from '@/interfaces/createBooking.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBookingValidationSchema } from '@/constants/validation/CreateBookingValidationSchema';

const CreateBookingForm = () => {
  const methods = useForm<ICreateBooking>({
    resolver: zodResolver(CreateBookingValidationSchema),
    shouldUnregister: true,
  });
  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
    getValues,
    setValue,
    watch,
    reset,
  } = methods;

  const onSubmit = (data: any) => console.log('data', data);

  console.log('values', getValues());
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfo />
          <EventDetailsForm />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateBookingForm;
