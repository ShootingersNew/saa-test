import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { installPinia } from '@/app/providers/pinia'
import { installVuetify } from '@/app/providers/vuetify'

const app = createApp(App)

installPinia(app)
installVuetify(app)

app.mount('#app')
