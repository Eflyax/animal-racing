<template>
  <b-list-group-item>
  <button v-if="this.id == this.$store.state.myId">
    nahoru
  </button>

  <span>{{ this.id }} {{this.name}}</span>
  
  <button v-if="this.id == this.$store.state.myId">
    dolů
  </button>
  </b-list-group-item>
</template>

<script>

 export default {
  props: ['name', 'id'],
   mounted(){
     console.log(this.$store.state.myId);// <= vypíše "name"
   },
  }
</script>
