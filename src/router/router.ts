import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRouter
} from 'vue-router';

import Welcome from '../wizard/Welcome.vue'
import NotFound from '../pages/NotFound.vue'

export const routes: RouteRecordRaw[] = [{
    path: '/',
    component: Welcome
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../wizard/User.vue'),
  },
  {
    path: '/users',
    component: () => import('../wizard/Users.vue'),
  },  
  { 
    path: '/:catchAll(.*)', 
    component: NotFound,
    name: 'NotFound'
  }

];

export {
  useRouter
}

export default createRouter({
  history: createWebHistory(),
  routes
});