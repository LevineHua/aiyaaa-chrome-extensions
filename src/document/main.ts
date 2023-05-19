import { createApp } from 'vue'
import App from './App.vue'

import router from '../router'

import '../assets/main.css'
import '../assets/global.scss'

const app = createApp(App)

app.use(router)

app.mount('#document')
