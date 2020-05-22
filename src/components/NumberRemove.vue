<template>
  <div>
    <button @click="removeNumber()">
     Remove last
    </button>
  </div>
</template>

<script>
export default {
  name: "NumberRemove",
  methods: {
    removeNumber() {
      // call store action
      this.$store.dispatch("removeLastElement");
    }
  }
};
</script>
