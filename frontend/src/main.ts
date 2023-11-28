/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'
import VueAxios from 'vue-axios'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faRightToBracket, faRightFromBracket, faUserPen, faCoins, faWallet } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faRightToBracket, faRightFromBracket, faUserPen, faCoins, faWallet)

// Composables
import { createApp } from 'vue'

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
app.use(VueAxios, axios)

registerPlugins(app)

app.mount('#app')
