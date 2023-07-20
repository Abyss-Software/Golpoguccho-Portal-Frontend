import HomeIcon from 'remixicon-react/HomeLineIcon';


export const SideBarConfig = [
  //side nav config for admin dashboard for analytics and user management. make it role based
  {
    name: 'Analytics',
    Icon: HomeIcon,
    path: '/admin/analytics',
    roles: ['admin', 'moderator']
  },
  {
    name: 'User Management',
    Icon: HomeIcon,
    path: '/admin/user-management',
    roles: ['moderator', 'user']
  },
  {
    name: 'Users List',
    Icon: HomeIcon,
    path: '/admin/user-management',
    roles: ['admin', 'user']
  }
]