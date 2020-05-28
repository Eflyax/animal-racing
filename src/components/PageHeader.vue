<template>
  <header>
    <h1>{{ $t("header") }}</h1>
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