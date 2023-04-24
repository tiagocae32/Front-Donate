import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/router'
import App from './App.vue'
import { useUserStore } from "./stores/userStore"
import vue3GoogleLogin from 'vue3-google-login'
import VueSweetalert2 from 'vue-sweetalert2';
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import 'sweetalert2/dist/sweetalert2.min.css';

const pinia = createPinia()

createApp(App)
.use(pinia)
.use(router)
.use(BootstrapVue3)
.use(VueSweetalert2)
.use(vue3GoogleLogin, {clientId: '888034196182-bg3c1n364k4r3q254vc9e3l65pej0fit.apps.googleusercontent.com'})
.mount("#app")


useUserStore()
