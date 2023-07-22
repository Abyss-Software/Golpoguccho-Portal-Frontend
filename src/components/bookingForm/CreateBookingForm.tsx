import { Input } from '@mantine/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PersonalInfo from './PersonalInfo';
import EventTypeSelection from './EventTypes';

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
        <EventTypeSelection />
      </form>
    </div>
  );
};

export default CreateBookingForm;
