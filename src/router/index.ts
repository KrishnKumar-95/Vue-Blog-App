import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'
import { useAuthStore } from '@stores/authStore'
import { computed, watch } from 'vue'
import PostsViewVue from '@views/blog/PostsView.vue'

// const isAuthenticated = computed(() => {
//   const authStore = useAuthStore()
//   return authStore.$state.isAuthenticated
// })
const isAuthenticated = false

watch(() => [isAuthenticated], (val) => {
  console.log("val => ", val[0])
})

// Authentication components
const Authentication = {
  register: () => import('@views/auth/RegisterView.vue'),
  login: () => import('@views/auth/LoginView.vue')
}

// Blog components
const Blog = {
  // all_posts: () => import("@views/blog/PostsView.vue"),
  add_post: () => import("@views/blog/PostAddForm.vue"),
  single_post: () => import("@views/blog/PostView.vue"),
}

const checkAuth = (to: any, from: any, next: Function) => {
  if (!isAuthenticated) {
    next("/auth/login")
  } else {
    next()
  }
}

const sendToLogin = (to: any, from: any, next: Function) => {
  const authStore = useAuthStore()
  if (isAuthenticated) {
    next('/blog')
  } else if (authStore.storedUsers().length === 0) {
    next('/auth/register')
  } else {
    next('/auth/login')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PostsViewVue,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@views/AboutView.vue")
    },
    {
      path: "/auth",
      name: "auth",
      // beforeEnter: sendToLogin,
      children: [
        {
          path: "login",
          name: "login",
          component: Authentication.login()
        },
        {
          path: "register",
          name: "register",
          component: Authentication.register()
        },
      ]
    },
    {
      path: "/blog",
      // beforeEnter: checkAuth,
      name: "Blog",
      children: [
      // {
      //   path: "",
      //   name: "Blog",
      //   component: Blog.all_posts(),
      // },
        {
          path: "add-post",
          name: "Add Post",
          component: Blog.add_post(),
          // beforeEnter: checkAuth,
        },
        {
          path: "post/:id",
          name: "Post",
          component: Blog.single_post(),
          // beforeEnter: checkAuth,
        },
      ]
    }
  ]
})

export default router
