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

  if (allowedRoles.includes(userInfo?.role!)) {
    return <>{children}</>;
  }

  return (
    <Navigate
      to={{
        pathname: '/unauthorized',
      }}
    />
  );
}

export default AuthGuard;
