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

  <v-snackbar
      v-model="status.alert"
      color="info"
    >
      {{ status.alert_msg }}

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="status.alert = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  // @ts-ignore
  import { useVuelidate } from '@vuelidate/core'
  // @ts-ignore
  import { email, required, helpers, minLength } from '@vuelidate/validators';
import type { ILoginUser } from '@interfaces/User';
import { ref } from 'vue';
import { AuthService } from '@services/auth.services';
import router from '@router/index';


const valid = ref<boolean>(false)

  const initialState = {
    email: "",
    password: "",
  }

  const state:ILoginUser = reactive({
    ...initialState,
  })

  const status = reactive({
    alert: false,
    alert_msg: ""
  })

  const rules = {
    email: { 
      required: helpers.withMessage("E-mail is required", required),
      email: helpers.withMessage("Enter valid email", email)
    },
    password: { required: helpers.withMessage("Password is required", required), minLength: helpers.withMessage(({$params,$model}:any) => `Minimum 8 characters required`, minLength(8)) },
  }

  const v$ = useVuelidate(rules, state)

  const handleSubmit = async (data:any) => {
    if(valid.value) {
      try {
        const resp = await AuthService.loginUser(state)
        status.alert = true
        status.alert_msg = resp.msg
        router.push('/')
      } catch (error) {
        
      }
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