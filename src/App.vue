<template>
  <div id="app">
    <PageHeader/>

    <router-view></router-view>
  </div>
</template>

<script>
// <template>
//   <div id="app">
//     <NumberDisplay/>
//     <NumberSubmit/>
//     <NumberRemove/>
//     <Chart/>
//   </div>
// </template>

import PageHeader from './components/PageHeader.vue'

import NumberDisplay from "./components/NumberDisplay";
import NumberSubmit from "./components/NumberSubmit";
import NumberRemove from "./components/NumberRemove";
import Chart from "./components/Chart";
import SignInForm from './components/SignInForm';

export default {
  name: "app",
  components: {
    PageHeader,
    NumberDisplay,
    NumberSubmit,
    NumberRemove,
    Chart,
    SignInForm
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
