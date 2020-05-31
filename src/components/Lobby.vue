<template>
  <div>
    <router-link to="/join-or-create">{{ $t("back") }}</router-link>

  <b-list-group horizontal="md">
    <lobby-player 
      v-for="player in this.$store.state.players"
      :name="player.name"
      :id="player.id"
    ></lobby-player>
  </b-list-group>

    <b-form @submit="onSubmit">
      <b-button type="submit" variant="primary">{{ $t("startGame") }}</b-button>
    </b-form>

    <b-button type="button" v-on:click="playerConnectedToLobby">Připoj Pýtýho</b-button>
  </div>
</template>

<script>
  // <ul id="players">    
  //       <lobby-player 
  //         v-for="player in this.$store.state.players"
  //         :name="player.name"
  //         :id="player.id"
  //       ></lobby-player>
  //   </ul>

import lobbyPlayer from './lobbyPlayer';

 export default {
  mounted(){
    console.log(this.$store.state.players);
  },
  components: {
    lobbyPlayer
  },
  methods: {
    onSubmit(e) {        
    },
    playerConnectedToLobby(){
      this.$store.state.players.push({name: 'Pýtý', id: 0});
    },
  }
}
</script>
