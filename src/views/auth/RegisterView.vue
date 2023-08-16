<template>
  <h1>Create Free Account</h1>
  <main>
    <v-form v-model:model-value="valid" @submit.prevent="handleSubmit">
      <v-text-field v-model="state.name" :error-messages="v$.name.$errors.map((e: any) => e.$message)" label="Name"
        class="mb-3" variant="solo-filled" required hint="Enter your name" @input="v$.name.$touch"
        @blur="v$.name.$touch"></v-text-field>

      <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map((e: any) => e.$message)" label="E-mail"
        class="mb-3" variant="solo-filled" required hint="Enter valid email" @input="v$.email.$touch"
        @blur="v$.email.$touch"></v-text-field>

      <v-text-field v-model="state.password" :error-messages="v$.password.$errors.map((e: any) => e.$message)"
        label="Password" class="mb-3" required type="password" hint="Enter password" variant="solo"
        @input="v$.password.$touch" @blur="v$.password.$touch">
      </v-text-field>

      <v-text-field v-model="state.confirm_pass" :error-messages="v$.confirm_pass.$errors.map((e: any) => e.$message)"
        label="Confirm Password" class="mb-3" required type="password" hint="Enter same password as before" variant="solo"
        @input="v$.confirm_pass.$touch" @blur="v$.confirm_pass.$touch">
      </v-text-field>

      <v-btn color="green" class="me-4" type="submit" @click="v$.$validate">
        Create Account
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
import { email, required, helpers, sameAs, minLength } from '@vuelidate/validators';
import type { IUser } from '@interfaces/User';
import { computed } from 'vue';
import { ref } from 'vue';
import { AuthService } from '@services/auth.services';
import router from '@router/index';

interface IWithConfPass extends IUser {
  confirm_pass: string
}

const initialState = {
  name: "",
  email: "",
  password: "",
  confirm_pass: ""
}

const state: IWithConfPass = reactive({
  ...initialState,
})

const status = reactive<{ alert: boolean, alert_msg: string }>({
  alert: false,
  alert_msg: ""
})

const valid = ref<boolean>(false)

const rules = {
  name: {
    required: helpers.withMessage("Name is required", required)
  },
  email: {
    required: helpers.withMessage("E-mail is required", required),
    email: helpers.withMessage("Enter valid email", email)
  },
  password: { required: helpers.withMessage("Password is required", required), minLength: helpers.withMessage(({ $params, $model }: any) => `Minimum 8 characters required`, minLength(8)) },
  confirm_pass: {
    required: helpers.withMessage("Confirm password is required", required),
    sameAsPassword: helpers.withMessage(({ $params, $model }: any) => `Confirm password must be same`, sameAs(computed(() => state.password)))
  },
}

const v$ = useVuelidate(rules, state)

const handleSubmit = async (e: any) => {
  if (valid.value && (state.confirm_pass === state.password)) {
    try {
      const resp = await AuthService.registerUser(state)
      status.alert = true
      status.alert_msg = resp.msg
      if (resp.status) {
        router.push("/auth/login")
      }
    } catch (error) {

    }
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
  margin-top: 3rem;
  width: 100vw;
}

main {
  width: 100vw;
  display: flex !important;
  justify-content: center;
  padding-top: 3rem;
}

.alert-box {
  width: 50vw;
}

main form {
  width: 50vw;
}
</style>@services/authServices@services/auth.services