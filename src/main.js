import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import staticService from "./services/staticService.js"
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.provide("staticService", staticService)
app.use(createPinia())
app.use(router)

app.mount('#app')
