<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@stores/authStore';
import { ref } from 'vue';
import { watch } from 'vue';
import Link from "@components/customs/Link.vue"

const isAuthenticated = ref<boolean>(false)
const authStore:any = useAuthStore();

watch(() => [authStore],(val:any) => {
  console.log(authStore[0]);
})

</script>

<template>
  <header>
    <nav>
      <Link to="/" title="Home"/>
      <Link to="/blog/add-post" title="Create Post"/>
      <Link to="/about" title="About"/>
      <Link to="/auth/login" title="Login"/>
      <Link to="/auth/register" title="Register"/>
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
