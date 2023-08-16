import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'
import { useAuthStore } from '@stores/authStore'
import { computed, watch } from 'vue'
import PostsViewVue from '@views/blog/PostsView.vue'
import { REGISTER_USER_STORAGE_KEY } from '@utils/constants'

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
      component: () => import("@views/AboutView.vue")
    },
    {
      path: "/auth",
      name: "auth",
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
        },
        {
          path: "post/:id",
          name: "Post",
          component: Blog.single_post(),
        },
      ]
    }
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  const users = JSON.parse(localStorage.getItem(REGISTER_USER_STORAGE_KEY) || JSON.stringify([]))
  
  if (!authStore.isAuthenticated && to.name !== 'login' && users.length > 0) {
    return { name: 'auth/login' }
  } else if (!authStore.isAuthenticated && to.name !== 'register' && users.length === 0) {
    return { name: 'auth/register' }
  }
})

export default router
