<template>
  <ul>
    <li><router-link to="/join">{{ $t("join")}}</router-link></li>
    <li><router-link to="/create">{{ $t("create")}}</router-link></li>
  </ul>
</template>

<script>
export default {
  name: "JoinOrCreate",
  computed: {
  }
};
</script>
