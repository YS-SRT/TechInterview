// import './assets/main.css'
import "./assets/tailwindcss.css"

import { createApp } from 'vue'
import createStore, { key } from './data/index'
import App from './App.vue'

const app = createApp(App)
app.use(createStore, key)
app.mount('#app')
