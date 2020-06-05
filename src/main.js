import Vue from "vue";
import App from "./App";
import store from "./store";
import VueRouter from 'vue-router';
import i18n from "./i18n.js";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueNativeSock from 'vue-native-websocket';

import SignInForm from './components/SignInForm';
import JoinOrCreate from './components/JoinOrCreate';
import Join from './components/Join';
import Create from './components/Create';
import Lobby from './components/Lobby';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.use(VueNativeSock, 'ws://localhost:9000', { store: store });

window.prepMessage = function (data) {
  return JSON.stringify(data);
}

const router = new VueRouter({
  routes: [
    { path: '/', component: SignInForm },
    { path: '/join-or-create', component: JoinOrCreate },
    { path: '/join', component: Join },
    { path: '/create', component: Create },
    { path: '/lobby', component: Lobby },
  ]
});

i18n.locale = 'cs';

new Vue({
  el: "#app",
  store,
  i18n,
  router: router,
  components: { App },
  template: "<App/>"
});
