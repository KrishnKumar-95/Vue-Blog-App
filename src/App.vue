<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@stores/authStore';
import { ref } from 'vue';
import { watch } from 'vue';

const isAuthenticated = ref<boolean>(false)
const authStore:any = useAuthStore();

watch(() => [authStore],(val:any) => {
  console.log(authStore[0]);
})

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/auth/login">Login</RouterLink>
      <RouterLink to="/auth/register">Register</RouterLink>
    </nav>
  </header>

  <div>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  width: 100vw;
}

nav {
  width: 100%;
  font-size: 12px;
  margin: 0.5rem 0;
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
