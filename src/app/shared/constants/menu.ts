import {IMenuLayout} from '@shared/models/menu-layout';

export const MENU: IMenuLayout[] = [    {
  key: 'dashboard',
  title: 'Dashboard',
  icon: 'dashboard',
  path: '/dashboard',
},
  {
    key: 'manager',
    title: 'Manager',
    icon: 'user',
    path: '/manager',
    // role: ['admin']
  },
  {
    title: 'User Management',
    icon: 'user',
    children: [
      { title: 'Tom' },
      { title: 'Bill' },
      {
        title: 'Alex',
        children: [
          { title: 'Profile' },
          { title: 'Settings' },
        ]
      },
    ]
  },
  {
    title: 'Team',
    icon: 'team',
    children: [
      { title: 'Team 1' },
      {
        title: 'Team 2',
        children: [
          { title: 'Subteam 1' },
          { title: 'Subteam 2' },
        ]
      }
    ]
  },
  { title: 'Files', icon: 'file' }
]
