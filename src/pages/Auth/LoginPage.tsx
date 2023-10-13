import googleSVG from '@/assets/svg/googly.svg';
import loginSVG from '@/assets/svg/login.svg';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import { useAuthStore } from '@/contexts/authContext';
import useAuthAction from '@/hooks/useAuthAction';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { UserRoles } from '@/constants/userRoles';
import { Divider } from '@mantine/core';

export default function LoginPage() {
  const { socialSigninMutation } = useAuthAction(useAuthStore());
  const userInfo = useAuthStore((state) => state.userInfo);

  const [searchParams, setSearchParams] = useSearchParams();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response: any) => {
      try {
        const data = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const payload = {
          email: data.data.email,
          name: data.data.name,
        };
        socialSigninMutation.mutate(payload, {
          onSuccess: () => {
            notifications.update({
              withBorder: true,
              id: 'signingIn',
              color: 'green',
              title: 'Success',
              message: 'Logged in successfully',
              icon: <CheckIcon size="2rem" />,
            });
          },
          onError: (error: any) => {
            notifications.update({
              withBorder: true,
              id: 'signingIn',
              color: 'red',
              title: 'Failed',
              message: error?.response?.data?.message || 'Something went wrong',
              icon: <ErrorIcon size="2rem" />,
            });
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      (userInfo.role === UserRoles.ADMIN ||
        userInfo.role === UserRoles.MODERATOR) &&
        navigate('/admin');
      userInfo.role === UserRoles.CLIENT && navigate('/client');
      userInfo.role === UserRoles.EMPLOYEE && navigate('/emp');
    }
  }, [userInfo]);

  return (
    <section className="min-h-screen md:h-screen flex flex-col md:flex-row justify-center items-center ">
      <div className="w-full h-full p-4 bg-black  flex-1 flex items-center justify-center">
        <img
          className="w-[200px] md:w-full md:max-w-md"
          src="https://res.cloudinary.com/dl8vvdyc5/image/upload/v1696765513/Assets/LogoWithMoto.svg"
          alt="Sample image"
        />
      </div>

      <div className="w-full bg-backgroundColor h-full p-8 flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div
            onClick={() => googleLogin()}
            className="  cursor-pointer flex mb-3  w-100 p-2.5 items-center justify-center bg-slate-200 rounded-md dark:bg-slate-800 "
          >
            <object
              data={googleSVG}
              type="image/svg+xml"
              className="mx-3 w-5 aspect-square"
            />
            Continue with Google
          </div>
          <Divider my="sm" label="OR" labelPosition="center" />
          <div className=" flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            {searchParams.get('register') ? <SignUpForm /> : <LoginForm />}
          </div>

          <p className="mt-4 text-sm">
            This platform is intended for managing bookings only. Before
            creating account or initiating a new booking, make sure to contact
            our support and confirm availability.
          </p>
          <p className="mt-4 text-sm">
            Support:{' '}
            <span className="text-primaryColor">
              +8801709295729, +8801927195229
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
