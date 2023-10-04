import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import LoginPage from './pages/Auth/LoginPage';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import Dashboard from './pages/dashboard/AdminDashboard';
import CreateBookingPage from './pages/Booking/CreateBookingPage';
import BookingDetailsPage from './pages/Booking/BookingDetailsPage';
import AdminLayout from './layouts/AppShell';
import BookingListPage from './pages/BookingList/BookingListPage';
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';
import EventTypesPage from './pages/EventTypes/EventTypesPage';
import EmployeeListPage from './pages/Employees/EmployeeListPage';
import PromoCodesPage from './pages/PromoCodes/PromoCodesPage';
import AuthGuard from './components/guard/AuthGuard';
import { UserRoles } from './constants/userRoles';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/client',
    element: (
      <AuthGuard allowedRoles={[UserRoles.CLIENT]}>
        <ClientLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <ClientDashboard />,
      },
      {
        path: 'new-booking',
        element: <CreateBookingPage />,
      },
      {
        path: 'booking-details/:id',
        element: <BookingDetailsPage />,
      },
    ],
  },
  {
    path: '/emp',
    element: (
      <AuthGuard allowedRoles={[UserRoles.EMPLOYEE]}>
        <ClientLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <EmployeeDashboard />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <AuthGuard allowedRoles={[UserRoles.ADMIN, UserRoles.MODERATOR]}>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="/admin/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'bookings',
        element: <BookingListPage />,
      },
      {
        path: 'booking-details/:id',
        element: <BookingDetailsPage />,
      },
      {
        path: 'packages',
        element: <EventTypesPage />,
      },
      {
        path: 'employees',
        element: <EmployeeListPage />,
      },
      {
        path: 'employees/:employeeId',
        element: <EmployeeDashboard />,
      },
      {
        path: 'promos',
        element: <PromoCodesPage />,
      },
    ],
  },
]);
