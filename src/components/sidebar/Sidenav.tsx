import { Box } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import DashboardIcon from 'remixicon-react/Dashboard2LineIcon';
import BookingIcon from 'remixicon-react/CalendarEventLineIcon';
import EmployeeIcon from 'remixicon-react/TeamLineIcon';
import PackageIcon from 'remixicon-react/AddBoxLineIcon';
import PromoIcon from 'remixicon-react/Coupon2LineIcon';

const data = [
  { label: 'Dashboard', nav: '/admin/dashboard', icon: <DashboardIcon /> },
  {
    label: 'Bookings',
    nav: '/admin/Bookings',
    icon: <BookingIcon />,
  },
  { label: 'Employees', nav: '/admin/employees', icon: <EmployeeIcon /> },
  { label: 'Packages', nav: '/admin/packages', icon: <PackageIcon /> },
  { label: 'Promo Codes', nav: '/admin/promos', icon: <PromoIcon /> },
];

const Sidenav = ({ setOpened }: any) => {
  const items = data.map((item, index) => (
    <NavLink
      key={index}
      to={item.nav}
      className={({ isActive }) => {
        const defaultClasses =
          'block py-4 px-4 transition-colors  dark:text-white hover:bg-primaryDarkColor hover:text-white no-underline ';
        return (
          defaultClasses +
          (isActive ? ' bg-primaryColor text-white' : 'text-gray-900')
        );
      }}
      onClick={() => {
        setOpened(false);
      }}
    >
      <span className="flex items-center gap-3">
        {item.icon} {item.label}
      </span>
    </NavLink>
  ));

  return <Box>{items}</Box>;
};

export default Sidenav;
