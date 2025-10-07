import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap CSS e JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// CSS customizado
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')