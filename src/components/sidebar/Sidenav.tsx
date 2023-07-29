import { Box, NavLink } from '@mantine/core';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const data = [
  { label: 'Dashboard', nav: '/dashboard' },
  {
    label: 'Bookings',
    nav: '/Bookings',
  },
  { label: 'Employees', nav: '/employees' },
  { label: 'Packages', nav: '/packages' },
];

const Sidenav = ({ setOpened }: any) => {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const items = data.map((item, index) => (
    <div className="pb-2 rounded-lg font-semibold">
      <NavLink
        key={item.label}
        active={index === active}
        label={item.label}
        onClick={() => {
          setActive(index);
          navigate(item.nav);
          setOpened();
        }}
        color="green"
        variant="filled"
      />
    </div>
  ));

  return <Box>{items}</Box>;
};

export default Sidenav;
