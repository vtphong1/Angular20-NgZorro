import {IMenuLayout} from '@shared/models/menu-layout';

export const MENU: IMenuLayout[] = [
  {
    key: 'category',
    title: 'Quản lý danh mục',
    icon: 'dashboard',
    children: [
      {
        title: 'Quản lý văn bản',
        key: 'document',
        path: 'category/document'
      },
      {
        title: 'Quản lý thông tin đối tác',
        key: 'partner_info',
        path: 'category/partner-info'
      },
      {
        title: 'Quản lý mẫu template văn bản',
        key: 'document-template',
        path: 'category/document-template'
      }
    ]
  },
  {
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
      {title: 'Tom'},
      {title: 'Bill'},
      {
        title: 'Alex',
        children: [
          {title: 'Profile'},
          {title: 'Settings'},
        ]
      },
    ]
  },
  {
    title: 'Team',
    icon: 'team',
    children: [
      {title: 'Team 1'},
      {
        title: 'Team 2',
        children: [
          {title: 'Subteam 1'},
          {title: 'Subteam 2'},
        ]
      }
    ]
  },
  {title: 'Files', icon: 'file'}
]
