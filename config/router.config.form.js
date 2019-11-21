export default [
  {
    path: '/form',
    name: 'form',
    hideInMenu: false,
    icon: 'form',
    // Routes: ["./routes/PrivateRoute.js"],  //路由守卫
    routes: [
      {
        path: '/form/submit',
        name: 'submit',
        component: './form/submit',
      },
      {
        path: '/form/list',
        name: 'list',
        component: './form/list',
      },
      {
        path: '/form/detail',
        name: 'detail',
        component: './form/detail',
      },
      {
        path: '/form/tabPane',
        name: 'tabPane',
        component: './form/tabPane',
      },
      {
        path: '/form/:name',
        component: './form/$name',
      },
    ]
  }
];
