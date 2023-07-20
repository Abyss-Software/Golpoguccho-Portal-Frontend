import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserRoles } from '../../constants/userRoles';

function AuthGuard({ allowedRoles = Object.values(UserRoles) }) {
  const location = useLocation();
  const userAuth = {
    id: 1,
    role: 'ADMIN',
  };
  return allowedRoles.includes(userAuth?.role) ? (
    <Outlet />
  ) : userAuth?.id ? (
    <Navigate
      to={{
        pathname: '/unauthorized',
      }}
    />
  ) : (
    <Navigate
      replace
      to={{
        pathname: '/login',
      }}
    />
  );
}

export default AuthGuard;
