<template>
  <div>
      <input v-model="numberInput" type="number" ref="email"/>
      
      <button @click="addNumber(numberInput)">
        Add new number
      </button>
  </div>
</template>

<script>

export default {
  name: "NumberSubmit",
  data() {
    return {
      numberInput: 0
    };
  },
  methods: {
    addNumber(numberInput) {
      // this call action in the store
      this.$store.dispatch("addNumber", numberInput); 
      this.$refs.email.value = '';
      this.$refs.email.focus();
    }
  }
};
</script>
