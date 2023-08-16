<template>
  <main>
    <div v-if="total === 0" class="no-posts">
      <h1>No posts added</h1>
      <div class="add-btn">
        <Link to-path="/blog/add-post" title="Create new post +" />
      </div>
    </div>
    <div v-else class="posts">
      <h1>All Posts - {{ total < 10 ? '0' + total : total }}</h1>
      <PostCard :posts="posts" />
    </div>
  </main>
</template>
  
<script setup lang="ts">
import Link from "@components/customs/Link.vue"
import type { IBlog } from "@interfaces/Blog";
import { defineAsyncComponent, ref } from "vue";
import { onBeforeMount } from "vue";
import { BlogService } from "@services/blog.services";
import { useAuthStore } from "@stores/authStore";
import router from "@router/index";

const PostCard = defineAsyncComponent({
  loader: () => import('@components/customs/PostCard.vue'),
  loadingComponent: () => '<div>Loading...</div>',
  delay: 1000,
  timeout:3000,
})

const authRouter = useAuthStore()

const posts = ref<IBlog[]>([])
const total = ref<number>(0)

const getPosts = async () => {
  const resp = await BlogService.getPosts()
  if (resp.status === 200) {
    posts.value = resp.data
    total.value = resp.total
  }
}

onBeforeMount(getPosts)
</script>
  
<style scoped>
main {
  width: 100vw;
}

.no-posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-btn a.router-link-exact-active {
  color: var(--color-text);
}

.add-btn a {
  display: inline-block;
  margin: 0 1rem;
  padding: 2px 5px;
  border-radius: 5px;
}

.posts {
  padding: 0 2rem;
}

.posts h1 {
  margin-bottom: 1rem;
}
</style>
  