<template>
  <main>
    <div class="post-details">
      <div class="title">
        <h1>{{ post.title }}</h1>
        <v-btn size="small" class="text-subtitle-2" v-on:click="() => router.back()">Back</v-btn>
      </div>
      <div class="img"><img :src="post.image" :alt="post.title"></div>
      <h4>{{ post.content }}</h4>
    </div>
  </main>
</template>
  
<script setup lang="ts">
import type { IBlog } from '@interfaces/Blog';
import { BlogService } from '@services/blog.services';
import { useAuthStore } from '@stores/authStore';
import { onBeforeMount } from 'vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const authRouter = useAuthStore()
const router = useRouter()

const post = reactive<IBlog>({
  id: 0,
  title: "",
  content: "",
  image: null
})

const getPost = async () => {
  try {
    const resp = await BlogService.getSinglePost(+router.currentRoute.value.params.id)
    if (resp.status === 200) {
      Object.assign(post, resp.data)
    }
  } catch (error) {

  }
}

onBeforeMount(getPost)
onBeforeMount(() => {
  if (!authRouter.isAuthenticated && Array.isArray(authRouter.storedUsers()) ) {
    if (authRouter.storedUsers().length > 0) {
      router.push("/auth/login")
    } else {
      router.push("/auth/register")
    }
  }
})

</script>
  
<style scoped>
.post-details {
  margin: 0 3rem;
}

.post-details img {
  width: 90vw;
  height: 70vh;
  object-fit: cover;
  aspect-ratio: 4/3;
}

h4 {
  margin-top: 1rem;
  margin-left: 1.3rem;
}

.title {
  display: flex;
  justify-content: space-between;
  margin: 0 1.3rem;
  margin-top: 1rem;
}

.img {
  display: flex;
  justify-content: center;
}
</style>
  