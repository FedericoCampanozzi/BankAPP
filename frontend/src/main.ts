import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {    
    faRightToBracket, 
    faRightFromBracket, 
    faUserPen, 
    faCoins, 
    faWallet, 
    faTrash,
    faArrowsRotate,
    faDownLong,
    faUpLong,
    faBuildingColumns
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faRightToBracket, 
    faRightFromBracket, 
    faUserPen, 
    faCoins, 
    faWallet,
    faTrash,
    faArrowsRotate,
    faDownLong,
    faUpLong,
    faBuildingColumns)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);
registerPlugins(app);
app.mount('#app');