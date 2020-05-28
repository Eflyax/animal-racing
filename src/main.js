import Vue from "vue";
import App from "./App";
import store from "./store";
import VueRouter from 'vue-router'
import i18n from "./i18n.js";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import SignInForm from './components/SignInForm';
import JoinOrCreate from './components/JoinOrCreate';
import Join from './components/Join';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: SignInForm },
    { path: '/join-or-create', component: JoinOrCreate },
    { path: '/join', component: Join },
    // { path: '/sign-in', component: SignInForm },
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
