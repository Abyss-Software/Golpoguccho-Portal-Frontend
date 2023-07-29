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
import Sidenav from '@/components/sidebar/Sidenav';
export default function AdminLayout() {
  const { toggleDarkMode, darkMode } = useContext(ThemeContext);

  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);
  const handlenavbarToggle = () => {
    setOpened((o) => !o);
  };
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
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 250 }}
          style={{ paddingTop: '1rem' }}
        >
          <Sidenav setOpened={handlenavbarToggle} />
        </Navbar>
      }
      header={
        <Header
          height={{ base: 50, md: 70 }}
          p="md"
          bg={'#009247'}
          withBorder={false}
        >
          <div className="text-white flex items-center justify-between h-full">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color="white"
                mr="xl"
              />
            </MediaQuery>
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
