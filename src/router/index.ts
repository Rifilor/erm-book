import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App.vue";
import LoginPage from "@/views/LoginPage.vue";
import BooksPage from "@/views/BooksPage.vue";
import SettingPage from "@/views/SettingPage.vue";
import BookDetailsPage from "@/views/BookDetailsPage.vue";
import UsersPage from "@/views/UsersPage.vue";
import BooksEditPage from "@/views/BooksEditPage.vue";
import BookAddNew from "@/views/BookAddNew.vue";
import UserAddNewPage from "@/views/UserAddNewPage.vue";
import UserEditPage from "@/views/UserEditPage.vue";
import {useLoginStore} from "@/stores/login";
import {Permissions} from "@/interface/interfaces";
// import LoginPage from '@/views/LoginPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
      redirect: '/books'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/books',
      name: 'books',
      component: BooksPage,
    },
    {
      path: '/books/:id',
      name: 'Book Details',
      component: BookDetailsPage,
    },
    {
      path: '/books/:id/edit',
      name: 'Book Edit',
      component: BooksEditPage,
      meta: { requiresPermission: 'can_edit_book' }
    },
    {
      path: '/books/add-new',
      name: 'Add new book',
      component: BookAddNew,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingPage,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersPage,
      meta: { requiresPermission: 'can_view_user' }
    },
    {
      path: '/users/add-new',
      name: 'Add new user',
      component: UserAddNewPage,
      meta: { requiresPermission: 'can_create_user' }
    },
    {
      path: '/users/:id/edit',
      name: 'Edit user',
      component: UserEditPage,
      meta: { requiresPermission: 'can_edit_user' }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();
  const requiredPermission = to.meta.requiresPermission as keyof Permissions ;
  if(to.name == 'login' && loginStore.getUserData) {
    next({name: 'books'});
  } if(to.name != 'login' && !loginStore.getUserData) {
    next({name: 'login'});
  } else if (requiredPermission ) {
    if (loginStore.getPermissionAccess(requiredPermission)) {
      next();
    } else {
      next(from);
    }
  } else {
    next();
  }
});

export default router
