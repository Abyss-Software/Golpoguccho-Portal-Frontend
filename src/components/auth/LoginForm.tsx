import { Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginPayload } from '@/interfaces/auth.interface';
import LockPasswordLineIcon from 'remixicon-react/LockPasswordLineIcon';
import MailLineIcon from 'remixicon-react/MailLineIcon';
import useAuthAction from '@/hooks/useAuthAction';
import { useAuthStore } from '@/contexts/authContext';
import { useEffect } from 'react';
import { UserRoles } from '@/constants/userRoles';

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>();

  const { signinMutation } = useAuthAction(useAuthStore());
  const userInfo = useAuthStore((state) => state.userInfo);

  const onSubmit: SubmitHandler<ILoginPayload> = (data) => {
    signinMutation.mutate(data);
  };

  useEffect(() => {
    if (userInfo) {
      userInfo.role === UserRoles.ADMIN && navigate('/admin');
      userInfo.role === UserRoles.CLIENT && navigate('/client');
      userInfo.role === UserRoles.EMPLOYEE && navigate('/emp');
    }
  }, [userInfo]);

  return (
    <form
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
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

      <div className="flex justify-between font-semibold text-sm">
        <Checkbox label="Remember Me" {...register('rememberMe')} />
        <Link
          className="no-underline text-primaryColor hover:underline hover:underline-offset-4"
          to="/forgot-password"
        >
          Forgot Password?
        </Link>
      </div>

      <Button radius="sm" size="md" className="uppercase mt-2" type="submit">
        Login
      </Button>

      <div className="mt-2 font-semibold text-sm text-slate-500 text-center md:text-left">
        Don't have an account?{' '}
        <Link
          className="no-underline text-primaryColor hover:underline hover:underline-offset-4"
          to="/?register=true"
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
