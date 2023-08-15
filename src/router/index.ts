import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'
import { useAuthStore } from '@stores/authStore'
import { computed } from 'vue'

const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.$state.isAuthenticated)

// Authentication components
const Authentication = {
  register: () => import('@views/auth/RegisterView.vue'),
  login: () => import('@views/auth/LoginView.vue')
}

// Blog components
const Blog = {
  all_posts: () => import("@views/blog/PostsView.vue"),
  add_post: () => import("@views/blog/PostAddForm.vue"),
  single_post: () => import("@views/blog/PostView.vue"),
}

const checkAuth = (to: any, from: any, next: Function) => {
  if (!isAuthenticated) {
    next("/auth/login")
  }
}

const sendToLogin = (to: any, from: any, next: Function) => {
  if (isAuthenticated) {
    next('/auth/login')
  } else {
    next('/auth/register')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/auth",
      name: "auth",
      beforeEnter: sendToLogin,
      children: [
        {
          path: "/login",
          name: "login",
          component: Authentication.login
        },
        {
          path: "/register",
          name: "register",
          component: Authentication.register
        },
      ]
    },
    {
      path: "/blog",
      name: "Blog",
      beforeEnter: checkAuth,
      component: Blog.all_posts,
      children: [
        {
          path: "/add-post",
          name: "Add Post",
          component: Blog.add_post,
          beforeEnter: checkAuth,
        },
        {
          path: "/post:id",
          name: "Post",
          component: Blog.single_post,
          beforeEnter: checkAuth,
        },
      ]
    }
    // {
    //   path: '/login',
    //   name: 'login',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: LoginView
    // }
  ]
})

export default router
