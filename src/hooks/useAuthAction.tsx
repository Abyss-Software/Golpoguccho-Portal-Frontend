import { authApi } from '@/api';
import { IAuthStore } from '@/contexts/authContext';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

function useAuthAction(authContext: IAuthStore) {
  const { setIsLoggedIn, setUserInfo } = authContext;

  const signinMutation = useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'signingIn',
        loading: true,
        title: 'Logging you in...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: (res) => {
      setIsLoggedIn(true);
      setUserInfo({
        id: res.body.user.id,
        name: res.body.user.name,
        role: res.body.user.role,
      });
    },
  });

  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'signup',
        loading: true,
        title: 'Signing Up...',
        message: 'Please wait while we are signing you up',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      setIsLoggedIn(true);
    },
  });

  const signoutMutation = useMutation({
    mutationFn: authApi.logout,
    onMutate: () => {
      setIsLoggedIn(false);
      setUserInfo(null);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async ({
      password,
      token,
    }: {
      password: string;
      token: string;
    }) => await authApi.resetPassword({ password, token }),
  });

  const socialSigninMutation = useMutation({
    mutationFn: authApi.socialLogin,
    onMutate: () => {
      notifications.show({
        withBorder: true,
        id: 'signingIn',
        loading: true,
        title: 'Logging you in...',
        message: 'Please wait',
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: (res) => {
      setIsLoggedIn(true);
      setUserInfo({
        id: res.body.user.id,
        name: res.body.user.name,
        role: res.body.user.role,
      });
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: authApi.forgotPassword,
  });

  return {
    signinMutation,
    socialSigninMutation,
    signupMutation,
    signoutMutation,
    resetPasswordMutation,
    forgotPasswordMutation,
  };
}

export default useAuthAction;
