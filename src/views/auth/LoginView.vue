<template>
  <h1>Login</h1>
  <main>
      <v-form v-model:model-value="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="state.email"
          :error-messages="v$.email.$errors.map((e:any) => e.$message)"
          label="E-mail"
          class="mb-3"
          variant="solo-filled"
          required
          hint="Enter valid email"
          @input="v$.email.$touch"
          @blur="v$.email.$touch"
        ></v-text-field>
    
        <v-text-field
          v-model="state.password"
          :error-messages="v$.password.$errors.map((e:any) => e.$message)"
          label="Password"
          class="mb-3"
          required
          type="password"
          hint="Enter password"
          variant="solo"
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
          append-inner-icon="mdi-map-marker"
        >
      </v-text-field>
    
        <v-btn
          color="green"
          class="me-4"
          type="submit"
          @click="v$.$validate"
        >
          Login
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
  import { email, required, helpers, minLength } from '@vuelidate/validators';
import type { ILoginUser } from '@interfaces/User';
import { ref } from 'vue';
import { watch } from 'vue';


const valid = ref<boolean>(false)

  const initialState = {
    email: "",
    password: "",
  }

  const state:ILoginUser = reactive({
    ...initialState,
  })

  const rules = {
    email: { 
      required: helpers.withMessage("E-mail is required", required),
      email: helpers.withMessage("Enter valid email", email)
    },
    password: { required: helpers.withMessage("Password is required", required), minLength: helpers.withMessage(({$params,$model}:any) => `Minimum 8 characters required`, minLength(8)) },
  }

  const v$ = useVuelidate(rules, state)

  const handleSubmit = (data:any) => {
    if(valid.value) {
      console.log({ data });
    }
  }

  function clear () {
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
  margin-top: 3rem;
  width: 100vw;
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