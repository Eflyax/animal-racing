<template>
  <div>
    <router-link to="/join-or-create">{{ $t("back") }}</router-link>

    <b-form @submit="onSubmit" @reset="onReset">

      <b-form-group id="input-group-2" v-bind:label="$t('gameCodeToJoin')" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.gameCodeToJoin"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">{{ $t("connectToGame") }}</b-button>
      <b-button type="reset" variant="danger">{{ $t("cleanUp") }}</b-button>
    
    </b-form>
  </div>
</template>

<script>
// v-bind:placeholder="$t('gameCodeToJoin')"
 export default {
    data() {
      return {
        form: {
          gameCodeToJoin: '',
        },
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.gameCodeToJoin = ''
      }
    }
  }
</script>
