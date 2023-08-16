<template>
  <RouterLink class="link-btn" :to="props.toPath || ''">
      {{ props.title }}
  </RouterLink>
</template>
  
<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  const props = defineProps({
    toPath: String,
    title: String
  })

</script>
  
<style scoped>

.link-btn {
  display: inline-block;
  margin: 0 1rem;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 18px;
}
</style>
  