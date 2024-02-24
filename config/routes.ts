export default [
  { name: '主页', path: '/', icon: 'smile', component: './Index' },
  {
    name: '查看接口',
    path: '/interface_info/:id',
    icon: 'smile',
    component: './InterfaceInfo',
    hideInMenu: true,
  },
  {
    name: '登录',
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/resetPassword', component: './User/ResetPassword' },
    ],
  },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理员页面',
    routes: [
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface_info',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '接口分析',
        icon: 'analysis',
        path: '/admin/analysis',
        component: './Admin/InterfaceAnalysis',
      },
      {
        name: '接口充值',
        icon: 'recharge',
        path: '/admin/recharge',
        component: './Admin/InterfaceRecharge',
      },
      { name: '用户管理',
        path: '/admin/user',
        component: './Admin/UserManage' },
    ],
  },
  {
    name: '账户中心',
    path: '/account',
    hideInMenu: true,
    routes: [{ path: '/account/center', component: './Account/AccountCenter' }],
  },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
