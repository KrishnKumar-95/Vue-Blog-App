<template>
  <h1>Create Blog Post</h1>
  <main>
    <v-form v-model:model-value="valid" @submit.prevent="handleSubmit">
      <v-text-field v-model="state.title" :error-messages="v$.title.$errors.map((e: any) => e.$message)" label="Title"
        class="mb-3" variant="solo-filled" required hint="Title of the post" @input="v$.title.$touch"
        @blur="v$.title.$touch"></v-text-field>

      <v-textarea v-model="state.content" :error-messages="v$.content.$errors.map((e: any) => e.$message)" label="Content"
        class="mb-3" required hint="Content of the post" variant="solo-filled" @input="v$.content.$touch"
        @blur="v$.content.$touch"></v-textarea>

      <v-file-input variant="solo-filled" label="Upload Image" prepend-icon="mdi-camera"
        v-on:update:model-value="handleImageChange"></v-file-input>

      <v-btn color="green" class="me-4" type="submit" @click="v$.$validate">
        submit
      </v-btn>
      <v-btn color="black" @click="clear">
        clear
      </v-btn>
    </v-form>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
// @ts-ignore
import { useVuelidate } from '@vuelidate/core'
// @ts-ignore
import { email, required, helpers } from '@vuelidate/validators';
import type { IBlog } from '@interfaces/Blog';
import { ref } from 'vue';
import { BlogService } from '@services/blog.services';

const initialState = {
  id: 0,
  title: "",
  content: "",
  image: null
}

const state: IBlog = reactive({
  ...initialState,
})

const valid = ref<boolean>(false)

const rules = {
  title: { required: helpers.withMessage("Title field is required", required) },
  content: { required: helpers.withMessage("Content field is required", required) },
}

const handleImageChange = (file: any) => {
  if (file[0]) {
    state.image = file[0];
  }
}

const v$ = useVuelidate(rules, state)

const handleSubmit = async (data: any) => {
  if (valid.value) {
    const _vals = Object.entries(state)
    const formData = new FormData()
    _vals.forEach((v: any) => {
      if (v[0] !== 'id') {
        formData.append(v[0], v[1])
        console.log(v[0], v[1])
      }
    })

    const resp = await BlogService.createPost(formData, {})
    console.log({ resp });
  }
}

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    // @ts-ignore
    state[key] = value
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

main {
  width: 100vw;
  display: flex !important;
  justify-content: center;
  padding-top: 3rem;
}

main form {
  width: 50vw;
}
</style>