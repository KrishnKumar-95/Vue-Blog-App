<template>
  <h1>Create Blog Post</h1>
  <main>
      <form>
        <v-text-field
          v-model="state.title"
          :error-messages="v$.title.$errors.map((e:any) => e.$message)"
          label="Title"
          class="mb-3"
          variant="solo-filled"
          required
          hint="Title of the post"
          @input="v$.title.$touch"
          @blur="v$.title.$touch"
        ></v-text-field>
    
        <v-textarea
          v-model="state.content"
          :error-messages="v$.content.$errors.map((e:any) => e.$message)"
          label="Content"
          class="mb-3"
          required
          hint="Content of the post"
          variant="solo-filled"
          @input="v$.content.$touch"
          @blur="v$.content.$touch"
        ></v-textarea>

        <v-file-input 
          variant="solo-filled"
          label="Upload Image"
          prepend-icon="mdi-camera"
          v-on:update:model-value="handleImageChange"
        ></v-file-input>
    
        <v-btn
          color="green"
          class="me-4"
          @click="v$.$validate"
        >
          submit
        </v-btn>
        <v-btn color="black" @click="clear">
          clear
        </v-btn>
      </form>
  </main>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  // @ts-ignore
  import { useVuelidate } from '@vuelidate/core'
  // @ts-ignore
  import { email, required, helpers } from '@vuelidate/validators';
  import type { IBlog } from '@interfaces/Blog';

  const initialState = {
    title: "",
    content: "",
    image: null
  }

  const state:IBlog = reactive({
    ...initialState,
  })

  const rules = {
    title: { required: helpers.withMessage("Title field is required", required) },
    content: { required: helpers.withMessage("Content field is required", required) },
  }

  const handleImageChange = (file:any) => {
    if (file[0]) {
      state.image = file[0];
    }
  }

  const v$ = useVuelidate(rules, state)

  function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }
</script>

<style>
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