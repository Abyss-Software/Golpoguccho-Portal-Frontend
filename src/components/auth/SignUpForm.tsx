import { Button, PasswordInput, TextInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ISignupPayload } from '@/interfaces/auth.interface';
import { Link } from 'react-router-dom';
import LockPasswordLineIcon from 'remixicon-react/LockPasswordLineIcon';
import MailLineIcon from 'remixicon-react/MailLineIcon';
import PersonIcon from 'remixicon-react/User6LineIcon';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupPayload>();

  const onSubmit: SubmitHandler<ISignupPayload> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        size="lg"
        label="Name"
        placeholder="Your Name"
        icon={<PersonIcon />}
        {...register('name', {
          validate: (value) => !!value.trim() || 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        })}
        error={!!errors.name && errors.name?.message}
      />

      <TextInput
        size="lg"
        type="email"
        label="Email"
        placeholder="Your Email"
        icon={<MailLineIcon />}
        {...register('email', {
          validate: (value) => !!value.trim() || 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email is invalid',
          },
        })}
        error={!!errors.email && errors.email?.message}
      />
      <PasswordInput
        size="lg"
        label="Password"
        placeholder="Your Password"
        icon={<LockPasswordLineIcon />}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        error={!!errors.password && errors.password?.message}
      />

      <Button radius="sm" size="md" className="uppercase mt-2" type="submit">
        Register
      </Button>

      <div className="mt-2 font-semibold text-sm text-slate-500 text-center md:text-left">
        Already have an account?{' '}
        <Link
          className="text-primaryColor hover:underline hover:underline-offset-4"
          to="/auth"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
