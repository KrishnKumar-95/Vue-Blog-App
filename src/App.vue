<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@stores/authStore';
import { computed, ref } from 'vue';
import Link from "@components/customs/Link.vue"
import { reactive } from 'vue';
import type { IUser } from '@interfaces/User';
import { watch } from 'vue';

const authStore: any = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const USER = reactive<IUser>({
  name: "",
  email: "",
  password: ""
})

const current_user = computed(() => authStore.current_user)

watch(() => [current_user], (val) => {
  Object.assign(USER, val[0])
})

</script>

<template>
  <header>
    <nav>
      <Link to="/" title="Home" />
      <Link to="/blog/add-post" title="Create Post" />
      <Link to="/about" title="About" />
      <Link v-if="!isAuthenticated" to="/auth/login" title="Login" />
      <Link v-if="!isAuthenticated" to="/auth/register" title="Register" />
      <Link v-if="isAuthenticated" to="" :title="current_user.name" />
      <Link v-if="isAuthenticated" to="" :title="current_user.email" />
    </nav>

    <v-btn v-if="isAuthenticated" variant="elevated" color="black" size="small" class="ma-2 me-6 text-subtitle-2" @click="() => authStore.logout()">Logout</v-btn>

  </header>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  width: 100vw;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
}

nav {
  width: 100%;
  font-size: 12px;
  margin: 0.5rem 0;
  padding: 0 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  margin: 0 1rem;
  padding: 2px 5px;
  border-radius: 5px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>
