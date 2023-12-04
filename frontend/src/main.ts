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
import { EnvironmentVariable } from "../environment/environment.global"

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
    faBuildingColumns);

const user = localStorage.getItem('user');
if(user != null) { 
    EnvironmentVariable.user = JSON.parse(user.toString());
    EnvironmentVariable.role = localStorage.getItem('role');
    EnvironmentVariable.isClient = EnvironmentVariable.role == "Client";
}

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);
registerPlugins(app);
app.mount('#app');