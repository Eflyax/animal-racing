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

      <div v-if="error">Zde bude chyba</div>

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
        error: null,
      }
    },
    mounted(){
      var that = this;
      this.$socket.onmessage = function(m){
        var m = JSON.parse(m.data);
        if(m.action != 'CREATE_LOBBY'){
          return;
        }
        if(m.error){
          that.error = m.error;
        }else{
          that.error = null;
          that.$router.push("/lobby?id=" + this.gameCode);
        }
      };
    },
    methods: {
      onSubmit(evt) {
        if(!this.isFormValid){
          evt.preventDefault();
        }else{
          this.$store.dispatch("setLobbyId", this.gameCode);   
          this.$socket.send(prepMessage(
            {
              action:'CREATE_LOBBY', 
              gameCode: this.gameCode
            }));
        }
      }
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
