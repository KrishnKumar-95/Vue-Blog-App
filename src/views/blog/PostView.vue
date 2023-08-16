<template>
  <main>
    <div class="post-details">
      <h1>{{ post.title }}</h1>
      <div class="img"><img :src="post.image" :alt="post.title"></div>
      <h4>{{ post.content }}</h4>
    </div>
  </main>
</template>
  
<script setup lang="ts">
import type { IBlog } from '@interfaces/Blog';
import { BlogService } from '@services/blog.services';
import { onBeforeMount } from 'vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
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

</script>
  
<style scoped>
.post-details{
  margin: 0 3rem;
}

.post-details img {
  width: 90vw;
  height: 70vh;
  object-fit: cover;
  aspect-ratio: 4/3;
}

.img {
  display: flex;
  justify-content: center;
}

</style>
  