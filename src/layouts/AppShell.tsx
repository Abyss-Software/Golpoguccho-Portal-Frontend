import { Children, useContext, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Switch,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import SunLineIcon from 'remixicon-react/SunLineIcon';
import MoonLineIcon from 'remixicon-react/MoonLineIcon';
import { ThemeContext } from '../contexts/ThemeContext';
export default function AdminLayout() {
  const { toggleDarkMode, darkMode } = useContext(ThemeContext);

  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#f0f0f0',
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 250 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md" bg={'#009247'}>
          <div className="text-white flex items-center justify-between h-full">
            <Text>Golpoguccho Photography</Text>
            <Switch
              size="md"
              color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
              onChange={toggleDarkMode}
              checked={darkMode}
              onLabel={
                <SunLineIcon size="1rem" color={theme.colors.yellow[4]} />
              }
              offLabel={
                <MoonLineIcon size="1rem" color={theme.colors.blue[6]} />
              }
            />
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
