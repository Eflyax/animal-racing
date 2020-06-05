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
    
    <b-form @submit="onSubmit" v-if="this.$store.getters.isLeader">
      <b-button type="submit" variant="primary">{{ $t("startGame") }}</b-button>    
    </b-form>

    <b-button type="button" v-on:click="playerConnectedToLobby">Připoj Pýtýho</b-button>
  </div>
</template>

<script>

import lobbyPlayer from './lobbyPlayer';

 export default {
  components: {
    lobbyPlayer
  },
  methods: {
    onSubmit(e) {
      // this.$socket.send(prepMessage({topic:'handshake', data:'sdf487rgiuh7'}));
    },
    playerConnectedToLobby(){
      this.$store.state.players.push({name: 'Pýtý', id: 0});
    },
  }
}
</script>
