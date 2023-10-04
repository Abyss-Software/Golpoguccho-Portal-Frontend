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
    <section className="h-screen flex flex-col md:flex-row justify-center items-center ">
      <div className="h-full p-4 bg-black  flex-1 flex items-center justify-center">
        {/* <img className="w-full max-w-md" src={authImg} alt="Sample image" /> */}
        <object
          data={loginSVG}
          type="image/svg+xml"
          className="w-full max-w-md"
        />
      </div>
      <div className="bg-backgroundColor h-full p-4 flex-1 flex items-center justify-center">
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
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className=" flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            {searchParams.get('register') ? <SignUpForm /> : <LoginForm />}
          </div>
        </div>
      </div>
    </section>
  );
}
