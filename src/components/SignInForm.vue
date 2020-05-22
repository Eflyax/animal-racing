<template>
  <div>
    <form @submit="checkForm">
      <input 
        type="password"
        ref="password" 
        v-model="passwordData" 
      />
      <!-- v-model zapisuje hodnotu do "data.passwordData" -->
      
      <button 
        class="btn btn-primary btn-lg btn-block" 
        type="submit"
      >
        Přihlásit se
      </button>
      
    <textarea>
      {{passwordData}}
    </textarea>
    <!-- propisuje se z "data.passwordData" -->

    </form>
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
