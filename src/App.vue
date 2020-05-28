<template>
  <div id="app">
    <PageHeader/>

    <router-view></router-view>
  </div>
</template>
<script>

import PageHeader from './components/PageHeader.vue'
import JoinOrCreate from "./components/JoinOrCreate";
import Join from "./components/Join";
import NumberSubmit from "./components/NumberSubmit";
import NumberRemove from "./components/NumberRemove";
import SignInForm from './components/SignInForm';

export default {
  name: "app",
  components: {
    PageHeader,
    JoinOrCreate,
    Join,
    NumberSubmit,
    NumberRemove,
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
