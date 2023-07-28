import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import DashboardLayout from './layouts/DashboardLayout';
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

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <LoginPage />,
  },
  {
    path: '/client',
    element: <ClientLayout />,
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
        path: 'booking-details',
        element: <BookingDetailsPage />,
      },
    ],
  },
  {
    path: '/emp',
    element: <ClientLayout />,
    children: [
      {
        path: '',
        element: <EmployeeDashboard />,
      },
    ],
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'bookings',
        element: <BookingListPage />,
      },
      {
        path: 'booking-details',
        element: <BookingDetailsPage />,
      },
      {
        path: 'event-types',
        element: <EventTypesPage />,
      },
      {
        path: 'employees',
        element: <EmployeeListPage />,
      },
    ],
  },
]);
