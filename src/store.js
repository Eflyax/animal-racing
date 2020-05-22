import Vue from "vue";
import Vuex from "vuex";

import authModule from "./modules/auth/AuthModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numbers: ['test', { name: 'Name' }]
  },
  modules: {
    authModule,
  },
  actions: {
    addNumber(context, number) { // this is called by component
      context.commit("ADD_NUMBER", number);
    },
    removeLastElement(context) { // this is called by component
      context.commit("REMOVE_LAST_ELEMENT");
    },
  },
  mutations: { // managing state
    ADD_NUMBER(state, payload) {
      state.numbers.push(payload);
    },
    REMOVE_LAST_ELEMENT(state, payload) {
      state.numbers.pop();
    }
  },
  getters: {
    getNumbers(state) {
      return state.numbers;
    }
  }
});
