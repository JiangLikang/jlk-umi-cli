export default [
  {
    path: '/exception',
    name: 'exception',
    hideInMenu: false,
    icon: 'warning',
    routes: [
      {
        path: '/exception/403',
        name: 'not-permission',
        component: './exception/403',
      },
      {
        path: '/exception/404',
        name: 'not-find',
        component: './exception/404',
      },
      {
        path: '/exception/500',
        name: 'server-error',
        component: './exception/500',
      }
    ]
  }
];
