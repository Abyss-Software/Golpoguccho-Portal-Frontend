import { Button, PasswordInput, TextInput } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import { ISignup } from '@/interfaces/auth.interface';
import LockPasswordLineIcon from 'remixicon-react/LockPasswordLineIcon';
import MailLineIcon from 'remixicon-react/MailLineIcon';
import PersonIcon from 'remixicon-react/User6LineIcon';
import { notifications } from '@mantine/notifications';
import useAuthAction from '@/hooks/useAuthAction';
import { useAuthStore } from '@/contexts/authContext';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>();

  const { signupMutation } = useAuthAction(useAuthStore());
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ISignup> = (data) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        navigate('/');
        notifications.update({
          id: 'signup',
          color: 'green',
          title: 'Signup success',
          message: 'Please log in to enter the system',
          icon: <CheckIcon size="2rem" />,
        });
      },
      onError: (error: any) => {
        notifications.update({
          id: 'signup',
          color: 'red',
          title: 'Signup failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
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
          to="/"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
