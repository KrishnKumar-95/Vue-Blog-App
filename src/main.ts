import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(vuetify)

// console.log("VITE_BASE_URL => ",import.meta.env);

app.mount('#app')