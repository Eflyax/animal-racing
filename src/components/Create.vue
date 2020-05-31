<template>
  <div>
    <router-link to="/join-or-create">{{ $t("back") }}</router-link>

    <b-form @submit="onSubmit">
      <b-button type="submit" variant="primary">{{ $t("createGame") }}</b-button>
    </b-form>
  </div>
</template>

<script>

 export default {
    data() {
      return {
        form: {
        },
      }
    },
    methods: {
      onSubmit(evt) {
        var hash = '4R52V23R23R23T';
        this.$store.dispatch("setLobbyId", hash);
        this.$router.push("/lobby?id=" + hash);
      }
    }
  }
</script>
