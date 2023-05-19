import { createApp } from 'vue'
import App from './App.vue'

import router from '../router'

import '../assets/global.scss'
import 'juejin-markdown-themes/dist/juejin.min.css';

const app = createApp(App)

app.use(router)

app.mount('#document')
