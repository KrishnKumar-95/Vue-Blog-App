<template>
    <div class="posts-list">
        <div class="post" :key="index * post.id" @click="() => goToDetail(post)" v-for="(post, index) in props.posts">
            <img :src="post.image" :alt="post.title">
            <h3>{{ post.title }}</h3>
            <h4>{{ post.content }}</h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IBlog } from '@interfaces/Blog';
import router from '@router/index';

const props = defineProps(['posts'])

const goToDetail = (post: IBlog) => router.push(`/blog/post/${post.id}`)

</script>

<style scoped>
.posts-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.posts-list img {
    width: 350px;
    border-radius: 10px;
}

.post {
    margin: 1rem;
    border-radius: 10px;
}

.post img:hover {
    transform: scale(1.1);
    transition: ease-in-out 0.3s;
}

</style>