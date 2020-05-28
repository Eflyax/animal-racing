<template>
  <div>
    <router-link to="/join-or-create">{{ $t("start")}}</router-link>

  </div>
</template>

<script>
export default {
  name: "SignInForm",
  state: {
  },
  data() {
    return {
      numberInput: 0,
      passwordData: '',
    };
  },
  methods: {
    checkForm: function (e) {
      console.log(this.$refs.password.value);
      e.preventDefault();
    },
    addNumber(numberInput) {
      // this call action in the store
      this.$store.dispatch("addNumber", numberInput); 
      this.$refs.email.value = '';
      this.$refs.email.focus();
    }
  }
};
</script>
