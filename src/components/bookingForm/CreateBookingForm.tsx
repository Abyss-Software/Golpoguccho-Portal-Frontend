import { Input } from '@mantine/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PersonalInfo from './PersonalInfo';
import EventTypeSelection from './EventDetailsForm';
import EventDetailsForm from './EventDetailsForm';

const CreateBookingForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PersonalInfo />
        <EventDetailsForm />
      </form>
    </div>
  );
};

export default CreateBookingForm;
