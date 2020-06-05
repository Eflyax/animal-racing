<template>
  <div>
    <router-link to="/join-or-create">{{ $t("back") }}</router-link>

    <b-form @submit="onSubmit">
      
      <label>{{ $t("gameCode") }}</label>
      
      <b-form-input 
        v-model="gameCode"
        :state="stateGameCode"
        ref="gameCodeInput"
        max-length="4"
      >
      </b-form-input>

      <b-button type="submit" variant="primary">{{ $t("createGame") }}</b-button>
    </b-form>
  </div>
</template>

<script>

 export default {
    data() {
      return {
        form: {},
        gameCode: '',
        isFormValid: false,
      }
    },
    methods: {
      onSubmit(evt) {
        if(!this.isFormValid){
          evt.preventDefault();
        }else{
          this.$store.dispatch("setLobbyId", this.gameCode);
          this.$router.push("/lobby?id=" + this.gameCode);
        }
      },
    },
    computed: {
      stateGameCode(){
        if(!this.gameCode.length){
          return null;
        }
        var isValid = this.gameCode.length == 4;
        this.isFormValid = isValid;

        return isValid;
      }
    }
  }
</script>
