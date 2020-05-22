import Vue from "vue";
import App from "./App";
import store from "./store";
import VueRouter from 'vue-router'
import VueApexCharts from 'vue-apexcharts';
import SignInForm from './components/SignInForm';
import chart from './components/chart';

Vue.use(VueApexCharts);
Vue.use(VueRouter);
Vue.component('apexchart', VueApexCharts);

const router = new VueRouter({
  routes: [
    { path: '/', component: SignInForm },
    { path: '/chart', component: chart },
    { path: '/sign-in', component: SignInForm },
    // { path: '/article/:id', component: ArticleDetails }
  ]
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  router: router,
  components: { App },
  template: "<App/>"
});
