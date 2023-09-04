import { useContext, useState } from 'react';
import {
  AppShell,
  Header,
  Text,
  useMantineTheme,
  Switch,
  Group,
  Menu,
  Avatar,
} from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import SunLineIcon from 'remixicon-react/SunLineIcon';
import MoonLineIcon from 'remixicon-react/MoonLineIcon';
import { ThemeContext } from '../contexts/ThemeContext';
import User3LineIcon from 'remixicon-react/User3LineIcon';
import LogoutBoxIcon from 'remixicon-react/LogoutBoxRLineIcon';
import useAuthAction from '@/hooks/useAuthAction';
import { useAuthStore } from '@/contexts/authContext';

export default function ClientLayout() {
  const { toggleDarkMode, darkMode } = useContext(ThemeContext);

  const { signoutMutation } = useAuthAction(useAuthStore());

  const navigate = useNavigate();
  const handleLogout = () => {
    signoutMutation.mutate();
    navigate('/');
  };

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
            <Group noWrap>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar size={35} radius="xl">
                    <User3LineIcon size="1.2rem" />
                  </Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    closeMenuOnClick={false}
                    rightSection={
                      <Switch
                        size="md"
                        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
                        onChange={toggleDarkMode}
                        checked={darkMode}
                        onLabel={
                          <SunLineIcon
                            size="1rem"
                            color={theme.colors.yellow[4]}
                          />
                        }
                        offLabel={
                          <MoonLineIcon
                            size="1rem"
                            color={theme.colors.blue[6]}
                          />
                        }
                      />
                    }
                  >
                    Change Theme{' '}
                  </Menu.Item>

                  <Menu.Item
                    color="red"
                    icon={<LogoutBoxIcon size={14} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
