import { useContext, useState } from 'react';
import {
  AppShell,
  Header,
  Text,
  useMantineTheme,
  Switch,
  Group,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import SunLineIcon from 'remixicon-react/SunLineIcon';
import MoonLineIcon from 'remixicon-react/MoonLineIcon';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ClientLayout() {
  const { toggleDarkMode, darkMode } = useContext(ThemeContext);

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      padding={0}
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : 'rgb(250 250 250)',
          padding: '0px',
          paddingTop: '70px',
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header height={70} p="md" bg={'#009247'}>
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
