import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserRoles } from '../../constants/userRoles';
import { useAuthStore } from '@/contexts/authContext';
import { Children } from 'react';

function AuthGuard({
  allowedRoles,
  children,
}: {
  allowedRoles: UserRoles[];
  children: React.ReactNode;
}) {
  const location = useLocation();

  const { isLoggedIn, userInfo } = useAuthStore();

  if (!isLoggedIn) {
    return (
      <Navigate
        replace
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return allowedRoles.includes(userInfo?.role!) ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: '/unauthorized',
      }}
    />
  );
}

export default AuthGuard;
