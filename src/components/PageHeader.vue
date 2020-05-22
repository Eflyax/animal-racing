<template>
  <header>
    <h1>Hlavička</h1>    

      <router-link to="/">Domů</router-link>
      <router-link to="/chart">Graf</router-link>
      <router-link to="/sign-in">Přihlášení</router-link>
  </header>
</template>

<script>
export default {
  data() {
    return {
      WebsiteSetting: ''
    }
  }
}
</script>

<style scoped>
  h1 {
    margin-top: 50px;
  }
</style>