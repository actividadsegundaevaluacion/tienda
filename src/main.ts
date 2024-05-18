import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'

import { supabase } from './lib/supabase'
import { userSession } from '@/lib/useAuth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//Listener in case user swap(state / log in log out)
supabase.auth.onAuthStateChange((event, sesion) => {
    userSession.value = sesion
})