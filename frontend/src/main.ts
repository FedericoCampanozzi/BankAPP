/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(VueAxios, axios)

registerPlugins(app)

app.mount('#app')
