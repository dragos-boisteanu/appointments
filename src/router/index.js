import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'appointments',
    component: () =>
      import('../views/appointments/AppointmentsView.vue'),
  },
  {
    path: '/users',
    component: () => import('../views/users/UsersView.vue'),
    children: [
      {
        path: '',
        name: 'users',
        component: () => import('../views/users/ListView.vue'),
      },
      {
        path: ':id',
        name: 'user',
        component: () => import('../views/users/UserView.vue'),
      },
    ],
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import('../views/roles/Roles.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
